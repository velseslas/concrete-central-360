import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientAdminFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientAdminFields({ form }: ClientAdminFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <FormField
        control={form.control}
        name="registreCommerce"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Registre de Commerce</FormLabel>
            <FormControl>
              <Input 
                placeholder="Registre de Commerce" 
                className="h-12 w-full" 
                maxLength={100}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nif"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>NIF</FormLabel>
            <FormControl>
              <Input 
                placeholder="NIF" 
                className="h-12 w-full" 
                maxLength={100}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nis"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>NIS</FormLabel>
            <FormControl>
              <Input 
                placeholder="NIS" 
                className="h-12 w-full" 
                maxLength={20}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="numeroArticle"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Article Imposition</FormLabel>
            <FormControl>
              <Input 
                placeholder="Article Imposition" 
                className="h-12 w-full" 
                maxLength={20}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}