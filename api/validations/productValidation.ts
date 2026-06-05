import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(2, "Category is required"),
  image: z.string().optional().or(z.literal("")),
  description: z.string().optional(),
  inStock: z.boolean().optional(),
  nameEn: z.string().optional(),
  tag: z.string().optional(),
  unit: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  sunnah: z.boolean().optional(),
  origPrice: z.number().optional().nullable(),
});

export const updateProductSchema = createProductSchema.partial();

