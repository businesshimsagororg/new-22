import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { createServer as createViteServer } from "vite";
import { logger } from "./api/utils/logger.ts";
import { z } from "zod";

// Routes
import productRoutes from "./api/routes/productRoutes.ts";
import orderRoutes from "./api/routes/orderRoutes.ts";
import systemRoutes from "./api/routes/systemRoutes.ts";
import customerRoutes from "./api/routes/customerRoutes.ts";
import settingsRoutes from "./api/routes/settingsRoutes.ts";

// Middlewares
import { errorHandler, notFoundHandler } from "./api/middleware/errorMiddleware.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Environment Validation at Startup
  try {
    const envSchema = z.object({
      FIREBASE_PROJECT_ID: z.string().min(1, "FIREBASE_PROJECT_ID is missing or empty"),
      FIREBASE_CLIENT_EMAIL: z.string().min(1, "FIREBASE_CLIENT_EMAIL is missing or empty"),
      FIREBASE_PRIVATE_KEY: z.string().min(1, "FIREBASE_PRIVATE_KEY is missing or empty"),
      SMTP_HOST: z.string().min(1, "SMTP_HOST is missing or empty"),
      SMTP_USER: z.string().min(1, "SMTP_USER is missing or empty"),
      SMTP_PASS: z.string().min(1, "SMTP_PASS is missing or empty"),
    });

    envSchema.parse(process.env);
    logger.info("✅ Core environment variables validated successfully.");
  } catch (err: any) {
    if (process.env.NODE_ENV === "production") {
      logger.error({ err }, "❌ Environment validation failed. Server cannot start in production mode");
      process.exit(1);
    } else {
      const errorMsg = err.errors?.map((e: any) => e.message).join(", ") || err.message;
      logger.warn({ errorMsg }, "⚠️ Environment validation failed (non-blocking in dev mode)");
    }
  }

  // Security Middlewares
  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "https://cdn.tailwindcss.com",
          "https://www.gstatic.com",
          "https://fonts.googleapis.com"
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: [
          "'self'", 
          "data:", 
          "blob:", 
          "https://images.unsplash.com", 
          "https://lh3.googleusercontent.com",
          "https://www.gstatic.com"
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://*.firebaseio.com",
          "https://identitytoolkit.googleapis.com",
          "https://securetoken.googleapis.com",
          "https://firestore.googleapis.com"
        ]
      }
    } : false,
  }));
  
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: process.env.NODE_ENV === "production" ? 150 : 1000,
      message: { error: "Too many requests from this IP, please try again later." },
    })
  );

  app.use(cors((req: express.Request, callback: (err: Error | null, options?: cors.CorsOptions) => void) => {
    const origin = req.header("Origin");
    const host = req.header("Host") || req.get("host");
    const proto = req.header("X-Forwarded-Proto") || (req.secure ? "https" : "http");
    const selfOrigin = host ? `${proto}://${host}` : null;

    const allowedOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

    if (process.env.ALLOWED_ORIGINS) {
      allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim()).filter(Boolean));
    }
    if (process.env.APP_URL) {
      allowedOrigins.push(process.env.APP_URL.trim());
    }
    if (process.env.CLOUD_RUN_URL) {
      allowedOrigins.push(process.env.CLOUD_RUN_URL.trim());
    }

    // Automatically trust Firebase Client Hosting URLs if configured
    const firebaseProjectId = process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
    if (firebaseProjectId) {
      allowedOrigins.push(`https://${firebaseProjectId}.web.app`);
      allowedOrigins.push(`https://${firebaseProjectId}.firebaseapp.com`);
    }

    const isAllowed = !origin || 
                      origin === selfOrigin || 
                      allowedOrigins.includes(origin);

    if (isAllowed) {
      callback(null, { origin: true, credentials: true });
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`), { origin: false });
    }
  }));
  app.use(express.json());

  // Request logging middleware
  app.use(pinoHttp({ logger }));

  // API Routes
  app.get("/api/firebase-config", (req, res) => {
    res.json({
      apiKey: process.env.VITE_FIREBASE_API_KEY || "",
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.VITE_FIREBASE_APP_ID || "",
      measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || ""
    });
  });

  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/customers", customerRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api", systemRoutes);

  // API 404 Handler (Relocated here BEFORE SPA and static fallback catch-alls so it is reachable)
  app.use("/api/*", notFoundHandler);

  // Serve static files from public folder
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error Handling
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`PureOrigins server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
