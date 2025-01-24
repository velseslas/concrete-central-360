import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const productSchema = z.object({
  category: z.string().min(1, "La catégorie est requise"),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productToEdit?: ProductFormValues & { id?: number };
}

const mockCategories = [
  { id: "1", name: "Béton" },
  { id: "2", name: "Pompe" },
  { id: "3", name: "Location" },
];

export function ProductClientForm({ open, onOpenChange, productToEdit }: ProductClientFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: productToEdit?.category || "",
      name: productToEdit?.name || "",
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Product data:", data);
    toast.success(productToEdit ? "Produit modifié avec succès" : "Produit ajouté avec succès");
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900/95 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {productToEdit ? "Modifier le produit" : "Nouveau produit"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Catégorie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {mockCategories.map((category) => (
                        <SelectItem 
                          key={category.id} 
                          value={category.id}
                          className="text-gray-200 focus:bg-gray-700/50"
                        >
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Nom du produit</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nom du produit" 
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="bg-gray-800/50 border-gray-700/50 text-gray-200 hover:bg-gray-700/50"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {productToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}