
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const productPriceSchema = z.object({
  projectId: z.string().min(1, "Le chantier est requis"),
  categoryId: z.string().min(1, "La catégorie est requise"),
  productId: z.string().min(1, "Le produit est requis"),
  price: z.string().min(1, "Le prix est requis"),
});

interface ProductPriceFormProps {
  clientId?: number;
}

export function ProductPriceForm({ clientId }: ProductPriceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for dropdown options
  const mockProjects = [
    { id: "1", name: "Projet Résidentiel Alger" },
    { id: "2", name: "Construction Centre Commercial" },
    { id: "3", name: "Rénovation Bureaux" },
    { id: "4", name: "Villa Privée" },
  ];
  
  const mockCategories = [
    { id: "1", name: "Béton" },
    { id: "2", name: "Matériaux de construction" },
    { id: "3", name: "Accessoires" },
  ];
  
  const mockProducts = [
    { id: "1", name: "Béton B25", categoryId: "1" },
    { id: "2", name: "Béton B30", categoryId: "1" },
    { id: "3", name: "Ciment", categoryId: "2" },
    { id: "4", name: "Sable", categoryId: "2" },
    { id: "5", name: "Gravier", categoryId: "2" },
    { id: "6", name: "Coffrage", categoryId: "3" },
  ];

  const form = useForm<z.infer<typeof productPriceSchema>>({
    resolver: zodResolver(productPriceSchema),
    defaultValues: {
      projectId: "",
      categoryId: "",
      productId: "",
      price: "",
    },
  });

  // Get selected category to filter products
  const selectedCategoryId = form.watch("categoryId");
  const filteredProducts = mockProducts.filter(product => product.categoryId === selectedCategoryId);

  const onSubmit = async (data: z.infer<typeof productPriceSchema>) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to save the data
      console.log("Product price data:", data, "for client:", clientId);
      
      toast.success("Prix du produit enregistré avec succès");
      
      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement du prix");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Ajouter un prix de produit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Chantier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Sélectionner un chantier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
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

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Produit</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                      disabled={!selectedCategoryId}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Sélectionner un produit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
                        {filteredProducts.map((product) => (
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

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Prix</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Entrez le prix"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                {isLoading ? "Enregistrement..." : "Enregistrer le prix"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
