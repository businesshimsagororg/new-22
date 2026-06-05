import { Request, Response, NextFunction } from "express";
import { db, admin } from "../config/firebaseConfig.ts";
import { AuthRequest } from "../middleware/authMiddleware.ts";
import { sendOrderAlert } from "../utils/notificationService.ts";
import { z } from "zod";

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const cursor = req.query.cursor as string;
    const status = req.query.status as string;

    let queryRef: any = db.collection("orders");

    if (status) {
      queryRef = queryRef.where("status", "==", status);
    }

    let query: any = queryRef.orderBy("createdAt", "desc").limit(limit);

    if (cursor) {
      const lastDoc = await db.collection("orders").doc(cursor).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const orders: any[] = [];
    snapshot.forEach((doc: any) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    // 1. Verify total calculation to prevent pricing tampering
    const items = req.body.items || [];
    let expectedTotal = 0;
    for (const item of items) {
      let realPrice = Number(item.price) || 0;
      if (item.productId && typeof item.productId === "string" && !item.productId.startsWith("combo-")) {
        const productDoc = await db.collection("products").doc(item.productId).get();
        if (productDoc.exists) {
          realPrice = Number(productDoc.data()?.price || 0);
        }
      }
      expectedTotal += realPrice * Number(item.quantity);
    }
    
    if (Math.abs(expectedTotal - Number(req.body.totalAmount)) > 0.01) {
      return res.status(400).json({ error: `Invalid totalAmount. Sum of item prices matches: ৳${expectedTotal}` });
    }

    // 2. Safely resolve uid for authenticated checkouts without blocking guest checkouts
    let uid = null;
    const header = req.get("authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (token) {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        uid = decodedToken.uid;
      } catch (err) {
        console.warn("Invalid ID token provided, defaulting to guest checkout", err);
      }
    }

    const orderData = {
      ...req.body,
      uid: uid || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "Pending"
    };
    const docRef = await db.collection("orders").add(orderData);

    // Automatically update or create customer record
    if (req.body.customerInfo?.phone) {
      // Use phone number digits as the document ID
      const phoneId = req.body.customerInfo.phone.replace(/[^0-9]/g, '');
      if (phoneId) {
        const customerRef = db.collection("customers").doc(phoneId);
        const orderTotal = Number(req.body.totalAmount) || 0;
        
        await customerRef.set({
          phone: req.body.customerInfo.phone,
          name: req.body.customerInfo.name || "Unknown",
          city: req.body.customerInfo.city || "Unknown",
          email: req.body.customerInfo.email || "",
          totalOrders: admin.firestore.FieldValue.increment(1),
          totalSpent: admin.firestore.FieldValue.increment(orderTotal),
          registeredAt: admin.firestore.FieldValue.serverTimestamp(),
          lastOrderDate: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
    }

    // Dispatch order alert email notification asynchronously without blocking response
    sendOrderAlert({
      id: docRef.id,
      customerInfo: {
        name: req.body.customerInfo?.name || req.body.customerName || "Unknown",
        phone: req.body.customerInfo?.phone || req.body.phone || "",
        address: req.body.customerInfo?.address || req.body.address || "",
        city: req.body.customerInfo?.city || req.body.city || ""
      },
      items: req.body.items || [],
      paymentMethod: req.body.paymentMethod || req.body.payment || "COD",
      totalAmount: Number(req.body.totalAmount) || 0
    }).catch(err => {
      console.error("Order notification dispatch failure:", err);
    });

    res.json({ success: true, orderId: docRef.id });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  if (!req.user) return res.status(401).json({ error: "Missing user" });
  try {
    const uid = req.user.uid;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const cursor = req.query.cursor as string;

    let query: any = db.collection("orders")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(limit);

    if (cursor) {
      const lastDoc = await db.collection("orders").doc(cursor).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const orders: any[] = [];
    snapshot.forEach((doc: any) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Status is required" });
    
    // Validate order status strictly using Zod values
    const statusSchema = z.enum(["Pending", "In Transit", "Delivered", "Cancelled"]);
    const parsedStatus = statusSchema.parse(status);
    
    await db.collection("orders").doc(id).update({ status: parsedStatus });
    res.json({ success: true, status: parsedStatus });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid status value",
        validValues: ["Pending", "In Transit", "Delivered", "Cancelled"],
        details: error.issues
      });
    }
    next(error);
  }
};
