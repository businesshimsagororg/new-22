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
  const PORT = Number(process.env.PORT) || 3000;

  // Environment Validation at Startup
  try {
    const envSchema = z.object({
      GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is missing or empty"),
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
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://lh3.googleusercontent.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"]
      }
    } : false,
  }));
  
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // Increased for dev/preview
      message: { error: "Too many requests from this IP, please try again later." },
    })
  );

  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];
  if (process.env.ALLOWED_ORIGINS) {
    allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim()).filter(Boolean));
  }

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".run.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));
  app.use(express.json());

  // Request logging middleware
  app.use(pinoHttp({ logger }));

  // API Routes
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/customers", customerRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api", systemRoutes);

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

  // Error Handling (must be after all routes and vite middleware)
  // We use a wrapper to avoid catching Vite errors in development
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
      notFoundHandler(req, res);
    } else {
      next();
    }
  });
  
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`PureOrigins server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
