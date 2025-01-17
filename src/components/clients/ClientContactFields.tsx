import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientContactFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientContactFields({ form }: ClientContactFieldsProps) {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel className="text-gray-200">Contact</FormLabel>
            <FormControl>
              <Input 
                placeholder="Nom du contact" 
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
        name="telephone"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel className="text-gray-200">Téléphone</FormLabel>
            <FormControl>
              <Input 
                placeholder="Numéro de téléphone" 
                className="h-10 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500" 
                maxLength={15}
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel className="text-gray-200">Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="Adresse email" 
                className="h-10 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500" 
                maxLength={100} 
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