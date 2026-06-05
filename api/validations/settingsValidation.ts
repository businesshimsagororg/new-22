import { z } from "zod";

export const updateSettingsSchema = z.object({
  storeName: z.string().optional(),
  supportEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  physicalAddress: z.string().optional(),
  currency: z.string().optional(),
  storeLogo: z.string().url().optional().or(z.literal("")),
  shipping: z.object({
    insideDhaka: z.object({
      charge: z.number().nonnegative(),
      estimatedTime: z.string()
    }).optional(),
    outsideDhaka: z.object({
      charge: z.number().nonnegative(),
      estimatedTime: z.string()
    }).optional()
  }).optional(),
  payment: z.object({
    bkash: z.boolean(),
    nagad: z.boolean(),
    cod: z.boolean(),
    rocket: z.boolean()
  }).optional(),
  notifications: z.object({
    newOrderAlerts: z.boolean(),
    lowStockAlerts: z.boolean(),
    weeklyReport: z.boolean()
  }).optional()
}).strict();
