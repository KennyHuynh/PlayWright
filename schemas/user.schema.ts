import { z } from 'zod';

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
}).loose();

export type PurchaseData = z.infer<typeof userSchema>;