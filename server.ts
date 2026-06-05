import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { createServer as createViteServer } from "vite";
import { logger } from "./api/utils/logger.ts";

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

  // Security Middlewares
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for preview environment compatibility
  }));
  
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // Increased for dev/preview
      message: { error: "Too many requests from this IP, please try again later." },
    })
  );

  app.use(cors());
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

  // MPA routing: specific HTML files
  app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "pureorigins.html"));
  });

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
    app.get('/', (req, res) => {
      res.sendFile(path.join(distPath, 'pureorigins.html'));
    });
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error Handling (must be after all routes and vite middleware)
  // We use a wrapper to avoid catching Vite errors in development
  app.use((req, res, next) => {
    notFoundHandler(req, res);
  });
  
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`PureOrigins server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
