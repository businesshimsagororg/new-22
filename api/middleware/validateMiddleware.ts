import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      // Zod throws an error object with a .errors array
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors
      });
    }
  };
};
