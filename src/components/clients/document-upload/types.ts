
import { z } from "zod";

export const documentSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  file: z.instanceof(FileList).refine((files) => files.length === 1, "Un fichier est requis"),
});

export type DocumentFormValues = z.infer<typeof documentSchema>;
