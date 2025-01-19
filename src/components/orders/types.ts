import { z } from "zod";

export const orderSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  projectId: z.string().min(1, "Le projet est requis"),
  deliveryDate: z.string().min(1, "La date de livraison est requise"),
  products: z.array(z.object({
    category: z.string().min(1, "La catégorie est requise"),
    product: z.string().min(1, "Le produit est requis"),
    quantity: z.string().min(1, "La quantité est requise"),
  })),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

export interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
  onSubmit?: (data: OrderFormValues) => void;
}

// Mock data for demonstration
export const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
];

export const mockProjects = [
  { id: "1", name: "Projet 1" },
  { id: "2", name: "Projet 2" },
];

export const mockCategories = [
  { id: "1", name: "Catégorie 1" },
  { id: "2", name: "Catégorie 2" },
];

export const mockProducts = [
  { id: "1", categoryId: "1", name: "Produit 1" },
  { id: "2", categoryId: "1", name: "Produit 2" },
  { id: "3", categoryId: "2", name: "Produit 3" },
];