import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";

const orderSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  projectId: z.string().min(1, "Le chantier est requis"),
  products: z.array(z.object({
    category: z.string().min(1, "La catégorie est requise"),
    product: z.string().min(1, "Le produit est requis"),
    quantity: z.string().min(1, "La quantité est requise"),
  })).min(1, "Au moins un produit est requis"),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Données mockées pour la démonstration
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
  { id: "1", categoryId: "1", name: "B25" },
  { id: "2", categoryId: "1", name: "B30" },
  { id: "3", categoryId: "2", name: "Pompe 36m" },
];

export function OrderForm({ open, onOpenChange }: OrderFormProps) {
  console.log("OrderForm rendered");

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      clientId: "",
      projectId: "",
      products: [{ category: "", product: "", quantity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSubmit = (data: OrderFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Commande créée avec succès");
    form.reset();
    onOpenChange(false);
  };

  const getProductsByCategory = (categoryId: string) => {
    return mockProducts.filter(product => product.categoryId === categoryId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900/95 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Nouvelle commande
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                          <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id} className="text-white hover:bg-gray-700">
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Chantier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                          <SelectValue placeholder="Sélectionner un chantier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {mockProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id} className="text-white hover:bg-gray-700">
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-4 gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`products.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Catégorie</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                              <SelectValue placeholder="Catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {mockCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id} className="text-white hover:bg-gray-700">
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`products.${index}.product`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Produit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                              <SelectValue placeholder="Produit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {getProductsByCategory(form.watch(`products.${index}.category`)).map((product) => (
                              <SelectItem key={product.id} value={product.id} className="text-white hover:bg-gray-700">
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`products.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Quantité</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            className="h-12 bg-gray-800/50 border-gray-700/50 text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="mb-2"
                      onClick={() => remove(index)}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full mt-2 border-dashed"
                onClick={() => append({ category: "", product: "", quantity: "" })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Check className="mr-2 h-4 w-4" />
                Valider
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}