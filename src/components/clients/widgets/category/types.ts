import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export interface Category {
  id: number;
  name: string;
  description: string;
}