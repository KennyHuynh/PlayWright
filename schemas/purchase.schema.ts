import { z } from 'zod';

export const purchaseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  country: z.string(),
  street: z.string(),
  city: z.string(),
  zipCode: z.string(),
  phoneNumber: z.string(),
}).loose();

export type LoginData = z.infer<typeof purchaseSchema>;