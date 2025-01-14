import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OrderFormValues } from "./types";

interface OrderFormFieldsProps {
  form: UseFormReturn<OrderFormValues>;
  index: number;
  mockCategories: { id: string; name: string; }[];
  mockProducts: { id: string; categoryId: string; name: string; }[];
}

export function OrderFormFields({ form, index, mockCategories, mockProducts }: OrderFormFieldsProps) {
  console.log("OrderFormFields rendered for index:", index);

  const getProductsByCategory = (categoryId: string) => {
    return mockProducts.filter(product => product.categoryId === categoryId);
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-end">
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
    </div>
  );
}