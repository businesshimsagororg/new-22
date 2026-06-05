import express from "express";
import { getCustomers } from "../controllers/customerController.ts";
import { requireFirebaseUser, requireAdmin } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/", requireFirebaseUser, requireAdmin, getCustomers);

export default router;
