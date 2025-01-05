import { z } from "zod";

export const paymentSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  projectId: z.string().min(1, "Le chantier est requis"),
  amount: z.string().min(1, "Le montant est requis"),
  paymentMethod: z.string().min(1, "Le mode de paiement est requis"),
  paymentDate: z.string().min(1, "La date de paiement est requise"),
  reference: z.string().min(1, "La référence est requise"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;