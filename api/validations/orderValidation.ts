import { z } from "zod";

export const createOrderSchema = z.object({
  customerInfo: z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(1, "City is required")
  }),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().int().positive()
  })).min(1, "Order must contain at least one item"),
  totalAmount: z.number().positive("Total amount must be positive"),
  paymentMethod: z.enum(["COD", "Bkash", "Nagad"]).default("COD"),
}).passthrough();
