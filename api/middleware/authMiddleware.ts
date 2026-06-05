import { Request, Response, NextFunction } from "express";
import { admin, missingEnv } from "../config/firebaseConfig.ts";

export const getAdminEmails = () => new Set(
  (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);

export interface AuthRequest extends Request {
  user?: any;
}

export async function requireFirebaseUser(req: AuthRequest, res: Response, next: NextFunction) {
  if (missingEnv.length > 0 || !admin.apps.length) {
    return res.status(500).json({
      error: "Firebase Admin is not configured",
      missing: missingEnv
    });
  }

  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "Missing Firebase ID token" });
  }

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Invalid Firebase ID token" });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: "Missing user" });
  const email = (req.user?.email || "").toLowerCase();
  const adminEmails = getAdminEmails();
  if (req.user?.admin !== true && !adminEmails.has(email)) {
    return res.status(403).json({ error: "This Google account is not an admin" });
  }
  next();
}

