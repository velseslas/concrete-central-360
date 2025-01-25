import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";

const priceFormSchema = z.object({
  client: z.string().min(1, "Le client est requis"),
  product: z.string().min(1, "Le produit est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  project: z.string().min(1, "Le chantier est requis"),
  price: z.string().min(1, "Le prix est requis"),
});

type PriceFormValues = z.infer<typeof priceFormSchema>;

interface PriceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PriceForm({ open, onOpenChange }: PriceFormProps) {
  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      client: "",
      product: "",
      category: "",
      project: "",
      price: "",
    },
  });

  const onSubmit = async (data: PriceFormValues) => {
    try {
      console.log("Submitting price data:", data);
      toast.success("Prix ajouté avec succès");
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting price:", error);
      toast.error("Erreur lors de l'ajout du prix");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Nouveau prix
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="client"
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
                        <SelectItem value="client1">Client 1</SelectItem>
                        <SelectItem value="client2">Client 2</SelectItem>
                        <SelectItem value="client3">Client 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project"
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
                        <SelectItem value="project1">Projet 1</SelectItem>
                        <SelectItem value="project2">Projet 2</SelectItem>
                        <SelectItem value="project3">Projet 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="category1">Béton</SelectItem>
                        <SelectItem value="category2">Pompe</SelectItem>
                        <SelectItem value="category3">Location</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Produit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                          <SelectValue placeholder="Sélectionner un produit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="product1">Béton B25</SelectItem>
                        <SelectItem value="product2">Béton B30</SelectItem>
                        <SelectItem value="product3">Béton B35</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Prix</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Prix" 
                      className="h-12 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400" 
                      type="number"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700/50">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}