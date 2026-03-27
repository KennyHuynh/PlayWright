import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
}).loose();

export type LoginData = z.infer<typeof loginSchema>;