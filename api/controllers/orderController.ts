import { Request, Response, NextFunction } from "express";
import { db, admin } from "../config/firebaseConfig.ts";
import { AuthRequest } from "../middleware/authMiddleware.ts";
import { sendOrderAlert } from "../utils/notificationService.ts";

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  if (!db) return res.status(500).json({ error: "Database not configured" });
  try {
    const limit = parseInt(req.query.limit as string) || 50;
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
    const orderData = {
      ...req.body,
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
        const customerDoc = await customerRef.get();
        const orderTotal = Number(req.body.totalAmount) || 0;
        
        if (customerDoc.exists) {
          await customerRef.update({
            totalOrders: admin.firestore.FieldValue.increment(1),
            totalSpent: admin.firestore.FieldValue.increment(orderTotal),
            lastOrderDate: admin.firestore.FieldValue.serverTimestamp(),
            name: req.body.customerInfo.name || customerDoc.data()?.name,
            city: req.body.customerInfo.city || customerDoc.data()?.city
          });
        } else {
          await customerRef.set({
            phone: req.body.customerInfo.phone,
            name: req.body.customerInfo.name || "Unknown",
            city: req.body.customerInfo.city || "Unknown",
            email: req.body.customerInfo.email || "",
            totalOrders: 1,
            totalSpent: orderTotal,
            registeredAt: admin.firestore.FieldValue.serverTimestamp(),
            lastOrderDate: admin.firestore.FieldValue.serverTimestamp()
          });
        }
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
  try {
    const uid = req.user.uid;
    const limit = parseInt(req.query.limit as string) || 50;
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
    
    await db.collection("orders").doc(id).update({ status });
    res.json({ success: true, status });
  } catch (error) {
    next(error);
  }
};
