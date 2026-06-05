import admin from "firebase-admin";
import { logger } from "../utils/logger.ts";

const requiredEnv = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

// Detect placeholder values so we don't crash on unset .env
const isPlaceholder = (v: string | undefined): boolean => !v || v.includes("your-firebase") || v.includes("YOUR_PRIVATE_KEY") || v.includes("xxxxx");
const hasPlaceholder = requiredEnv.some((k) => isPlaceholder(process.env[k]));

if (!admin.apps.length && missingEnv.length === 0 && !hasPlaceholder) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n")
      })
    });
    logger.info("✅ Firebase Admin initialized.");
  } catch (err) {
    logger.error({ err }, "⚠️ Firebase Admin init failed");
  }
} else if (!admin.apps.length) {
  logger.warn("⚠️ Firebase Admin NOT configured. Fill in .env with real service account credentials.");
}

const db = (admin.apps.length > 0) ? admin.firestore() : null;

export { admin, db, missingEnv };
