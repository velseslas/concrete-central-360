import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientAdminFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientAdminFields({ form }: ClientAdminFieldsProps) {
  return (
    <div className="space-y-3 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="registreCommerce"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-200">Registre de Commerce</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Registre de Commerce" 
                  className="h-10 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500" 
                  maxLength={100}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numeroArticle"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-200">Article Imposition</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Article Imposition" 
                  className="h-10 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500" 
                  maxLength={20}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="nif"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-200">NIF</FormLabel>
              <FormControl>
                <Input 
                  placeholder="NIF" 
                  className="h-10 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500" 
                  maxLength={100}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nis"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-200">NIS</FormLabel>
              <FormControl>
                <Input 
                  placeholder="NIS" 
                  className="h-10 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500" 
                  maxLength={20}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}