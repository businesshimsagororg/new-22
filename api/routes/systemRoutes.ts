import express from "express";
import { getHealth, getMe, updateMe, getAdminSummary, seedDatabase } from "../controllers/systemController.ts";
import { requireFirebaseUser, requireAdmin } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/health", getHealth);
router.post("/health", getHealth);
router.get("/me", requireFirebaseUser, getMe);
router.put("/me", requireFirebaseUser, updateMe);
router.get("/admin/summary", requireFirebaseUser, requireAdmin, getAdminSummary);
router.post("/seed", requireFirebaseUser, requireAdmin, seedDatabase);

export default router;
