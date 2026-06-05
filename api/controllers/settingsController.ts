import { Request, Response, NextFunction } from "express";
import { db } from "../config/firebaseConfig.ts";

// Default settings to use if the document doesn't exist yet
const DEFAULT_SETTINGS = {
  storeName: "PureOrigins",
  supportEmail: "support@pureorigins.com",
  contactPhone: "+880 1234-567890",
  physicalAddress: "Gulshan Avenue, Dhaka, Bangladesh",
  currency: "BDT",
  shipping: {
    insideDhaka: { charge: 60, estimatedTime: "1-2 Days" },
    outsideDhaka: { charge: 120, estimatedTime: "3-5 Days" }
  },
  payment: {
    bkash: true,
    nagad: true,
    cod: true,
    rocket: false
  },
  notifications: {
    newOrderAlerts: true,
    lowStockAlerts: true,
    weeklyReport: false
  }
};

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const doc = await db.collection("settings").doc("general").get();
    if (doc.exists) {
      res.json({ ...DEFAULT_SETTINGS, ...doc.data() });
    } else {
      // Return defaults; create the document with defaults
      await db.collection("settings").doc("general").set(DEFAULT_SETTINGS);
      res.json(DEFAULT_SETTINGS);
    }
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const updates = req.body;
    if (!updates || typeof updates !== "object") {
      return res.status(400).json({ error: "Invalid settings payload" });
    }
    await db.collection("settings").doc("general").set(updates, { merge: true });
    res.json({ success: true, message: "Settings saved" });
  } catch (error) {
    next(error);
  }
};
