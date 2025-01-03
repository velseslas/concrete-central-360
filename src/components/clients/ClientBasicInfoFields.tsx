import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues } from "./ClientForm";

interface ClientBasicInfoFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

export function ClientBasicInfoFields({ form }: ClientBasicInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="categorieClient"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Catégorie client</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="entreprise">Entreprise</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="raisonSociale"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Raison sociale</FormLabel>
              <FormControl>
                <Input placeholder="Raison sociale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom du client" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nom du contact" 
                  maxLength={30}
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