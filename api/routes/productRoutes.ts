import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.ts";
import { requireFirebaseUser, requireAdmin } from "../middleware/authMiddleware.ts";
import { validate } from "../middleware/validateMiddleware.ts";
import { createProductSchema, updateProductSchema } from "../validations/productValidation.ts";

const router = express.Router();

router.get("/", getProducts);
router.post("/", requireFirebaseUser, requireAdmin, validate(createProductSchema), createProduct);
router.put("/:id", requireFirebaseUser, requireAdmin, validate(updateProductSchema), updateProduct);
router.delete("/:id", requireFirebaseUser, requireAdmin, deleteProduct);

export default router;
