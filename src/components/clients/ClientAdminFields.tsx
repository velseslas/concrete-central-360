import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientAdminFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientAdminFields({ form }: ClientAdminFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="registreCommerce"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Registre de Commerce</FormLabel>
            <FormControl>
              <Input placeholder="Registre de Commerce" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nif"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NIF</FormLabel>
            <FormControl>
              <Input placeholder="NIF" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nis"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NIS</FormLabel>
            <FormControl>
              <Input placeholder="NIS" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="numeroArticle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Article Imposition</FormLabel>
            <FormControl>
              <Input placeholder="Article Imposition" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}