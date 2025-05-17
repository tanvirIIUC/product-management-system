import { z } from "zod";

// For login validation
export const userLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
