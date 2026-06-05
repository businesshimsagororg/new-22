import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.ts";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err }, "API Error");

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
    // Only include stack trace if we are not in production
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// Handle 404 for undefined API routes
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};
