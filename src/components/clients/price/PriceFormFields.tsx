import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";

export const priceFormSchema = z.object({
  client: z.string().min(1, "Le client est requis"),
  product: z.string().min(1, "Le produit est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  project: z.string().min(1, "Le chantier est requis"),
  price: z.string().min(1, "Le prix est requis"),
});

export type PriceFormValues = z.infer<typeof priceFormSchema>;

interface PriceFormFieldsProps {
  form: UseFormReturn<PriceFormValues>;
}

export function PriceFormFields({ form }: PriceFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
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
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
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
      </motion.div>
    </div>
  );
}