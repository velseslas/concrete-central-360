import { z } from "zod";

export const orderSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  projectId: z.string().min(1, "Le chantier est requis"),
  products: z.array(z.object({
    category: z.string().min(1, "La catégorie est requise"),
    product: z.string().min(1, "Le produit est requis"),
    quantity: z.string().min(1, "La quantité est requise"),
  })).min(1, "Au moins un produit est requis"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

export interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OrderFormValues) => void;
}

export const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
];

export const mockProjects = [
  { id: "1", name: "Chantier 1" },
  { id: "2", name: "Chantier 2" },
];

export const mockCategories = [
  { id: "1", name: "Béton" },
  { id: "2", name: "Pompe" },
];

export const mockProducts = [
  { id: "1", categoryId: "1", name: "B25" },
  { id: "2", categoryId: "1", name: "B30" },
  { id: "3", categoryId: "2", name: "Pompe 36m" },
];