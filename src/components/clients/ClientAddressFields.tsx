import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientAddressFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientAddressFields({ form }: ClientAddressFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="adresse"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Input placeholder="Adresse" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ville"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ville</FormLabel>
            <FormControl>
              <Input placeholder="Ville" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="codePostal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Code postal</FormLabel>
            <FormControl>
              <Input placeholder="Code postal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}