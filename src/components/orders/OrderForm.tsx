import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Order {
  id: string;
  clientId: number;
  clientName: string;
  product: string;
  quantity: number;
  deliveryDate: string;
  orderDate: string;
  totalPrice: number;
  status: "pending" | "in_progress" | "completed";
}

const orderSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  projectId: z.string().min(1, "Le chantier est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  product: z.string().min(1, "Le produit est requis"),
  quantity: z.string().min(1, "La quantité est requise"),
  deliveryDate: z.string().min(1, "La date de livraison est requise"),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OrderFormValues) => void;
  orderToEdit?: Order | null;
}

const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
];

const mockProjects = [
  { id: "1", name: "Chantier 1" },
  { id: "2", name: "Chantier 2" },
];

const mockCategories = [
  { id: "1", name: "Béton" },
  { id: "2", name: "Pompe" },
];

const mockProducts = [
  { id: "1", name: "B25" },
  { id: "2", name: "B30" },
];

export function OrderForm({ open, onOpenChange, onSubmit, orderToEdit }: OrderFormProps) {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: orderToEdit ? {
      clientId: orderToEdit.clientId.toString(),
      projectId: "",
      category: "",
      product: orderToEdit.product,
      quantity: orderToEdit.quantity.toString(),
      deliveryDate: orderToEdit.deliveryDate,
    } : {
      clientId: "",
      projectId: "",
      category: "",
      product: "",
      quantity: "",
      deliveryDate: "",
    },
  });

  const handleSubmit = (data: OrderFormValues) => {
    console.log("Form submitted:", data);
    onSubmit(data);
    toast.success(orderToEdit ? "Commande modifiée avec succès" : "Commande créée avec succès");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {orderToEdit ? "Modifier la commande" : "Nouvelle commande"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chantier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner un chantier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner un produit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantité (m³)</FormLabel>
                    <FormControl>
                      <Input type="number" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de livraison</FormLabel>
                    <FormControl>
                      <Input type="date" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {orderToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}