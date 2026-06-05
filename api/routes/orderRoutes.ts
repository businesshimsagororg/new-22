import express from "express";
import rateLimit from "express-rate-limit";
import { getOrders, createOrder, getMyOrders, updateOrderStatus } from "../controllers/orderController.ts";
import { requireFirebaseUser, requireAdmin } from "../middleware/authMiddleware.ts";
import { validate } from "../middleware/validateMiddleware.ts";
import { createOrderSchema } from "../validations/orderValidation.ts";

const router = express.Router();

const orderLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 20 }); // 20 orders/hr per IP

router.get("/", requireFirebaseUser, requireAdmin, getOrders);
router.get("/my-orders", requireFirebaseUser, getMyOrders);
router.post("/", orderLimiter, validate(createOrderSchema), createOrder);
router.put("/:id/status", requireFirebaseUser, requireAdmin, updateOrderStatus);

export default router;
