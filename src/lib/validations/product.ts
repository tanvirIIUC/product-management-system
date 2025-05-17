import { z } from "zod";

export const productSchema = z.object({
  img: z.string().url(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
});
