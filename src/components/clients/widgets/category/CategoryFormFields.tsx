import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CategoryFormValues } from "./types";

interface CategoryFormFieldsProps {
  form: UseFormReturn<CategoryFormValues>;
}

export function CategoryFormFields({ form }: CategoryFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Nom</FormLabel>
            <FormControl>
              <Input 
                placeholder="Nom de la catégorie" 
                {...field}
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-blue-500/50 transition-colors"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Description de la catégorie" 
                {...field}
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-blue-500/50 transition-colors resize-none"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </>
  );
}