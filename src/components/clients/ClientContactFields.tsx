import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientContactFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientContactFields({ form }: ClientContactFieldsProps) {
  return (
    <div className="space-y-6 w-full">
      <FormField
        control={form.control}
        name="telephone"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Téléphone</FormLabel>
            <FormControl>
              <Input placeholder="Numéro de téléphone" className="h-12 w-full" maxLength={15} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Adresse email" className="h-12 w-full" maxLength={100} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}