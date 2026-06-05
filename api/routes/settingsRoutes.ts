import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.ts";
import { requireFirebaseUser, requireAdmin } from "../middleware/authMiddleware.ts";
import { validate } from "../middleware/validateMiddleware.ts";
import { updateSettingsSchema } from "../validations/settingsValidation.ts";

const router = express.Router();

router.get("/", requireFirebaseUser, requireAdmin, getSettings);
router.put("/", requireFirebaseUser, requireAdmin, validate(updateSettingsSchema), updateSettings);

export default router;
