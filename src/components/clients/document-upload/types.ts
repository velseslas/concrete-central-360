import { z } from "zod";

export const documentSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  file: z.any().refine((file) => file?.length === 1, "Un fichier est requis"),
});

export type DocumentFormValues = z.infer<typeof documentSchema>;