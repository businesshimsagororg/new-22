import express from "express";
import { getOrders, createOrder, getMyOrders, updateOrderStatus } from "../controllers/orderController.ts";
import { requireFirebaseUser, requireAdmin } from "../middleware/authMiddleware.ts";
import { validate } from "../middleware/validateMiddleware.ts";
import { createOrderSchema } from "../validations/orderValidation.ts";

const router = express.Router();

router.get("/", requireFirebaseUser, requireAdmin, getOrders);
router.get("/my-orders", requireFirebaseUser, getMyOrders);
router.post("/", validate(createOrderSchema), createOrder);
router.put("/:id/status", requireFirebaseUser, requireAdmin, updateOrderStatus);

export default router;
