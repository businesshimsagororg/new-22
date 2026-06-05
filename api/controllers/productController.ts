import { Request, Response, NextFunction } from "express";
import { db, admin } from "../config/firebaseConfig.ts";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const cursor = req.query.cursor as string;
    const category = req.query.category as string;
    const inStock = req.query.inStock as string;

    let queryRef: any = db.collection("products");

    if (category) {
      queryRef = queryRef.where("category", "==", category);
    }
    if (inStock) {
      queryRef = queryRef.where("inStock", "==", inStock === "true");
    }

    let query: any = queryRef.orderBy("createdAt", "desc").limit(limit);

    if (cursor) {
      const lastDoc = await db.collection("products").doc(cursor).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const products: any[] = [];
    snapshot.forEach((doc: any) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const now = new Date();
    const productData = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection("products").add(productData);
    res.status(201).json({ id: docRef.id, ...req.body, createdAt: now.toISOString() });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const { id } = req.params;
    const prodRef = db.collection("products").doc(id);
    const prodDoc = await prodRef.get();
    if (!prodDoc.exists) return res.status(404).json({ error: "Product not found" });

    const now = new Date();
    const updates = { ...req.body, updatedAt: admin.firestore.FieldValue.serverTimestamp() };
    await prodRef.update(updates);
    res.json({ success: true, id, ...req.body, updatedAt: now.toISOString() });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const { id } = req.params;
    const prodRef = db.collection("products").doc(id);
    const prodDoc = await prodRef.get();
    if (!prodDoc.exists) return res.status(404).json({ error: "Product not found" });

    await prodRef.delete();
    res.json({ success: true, id });
  } catch (error) {
    next(error);
  }
};
