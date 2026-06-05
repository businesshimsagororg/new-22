import { Request, Response, NextFunction } from "express";
import { db } from "../config/firebaseConfig.ts";

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const cursor = req.query.cursor as string;

    let query: any = db.collection("customers").orderBy("lastOrderDate", "desc").limit(limit);

    if (cursor) {
      const lastDoc = await db.collection("customers").doc(cursor).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const customers: any[] = [];
    snapshot.forEach((doc: any) => {
      customers.push({ id: doc.id, ...doc.data() });
    });
    res.json(customers);
  } catch (error) {
    next(error);
  }
};
