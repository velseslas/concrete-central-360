import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientAddressFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientAddressFields({ form }: ClientAddressFieldsProps) {
  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Adresse" 
                    className="h-12 w-full" 
                    maxLength={255} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="ville"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ville" 
                  className="h-12 w-full" 
                  maxLength={50} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codePostal"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Code postal</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Code postal" 
                  className="h-12 w-full" 
                  maxLength={10} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}