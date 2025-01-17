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
    <div className="space-y-3 w-full">
      <div className="grid grid-cols-4 gap-3">
        <FormField
          control={form.control}
          name="categorieClient"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel className="text-gray-200">Catégorie client</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10 bg-gray-800/50 border-gray-700 text-gray-200">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="particulier" className="text-gray-200 focus:bg-gray-700">Particulier</SelectItem>
                  <SelectItem value="entreprise" className="text-gray-200 focus:bg-gray-700">Entreprise</SelectItem>
                  <SelectItem value="administration" className="text-gray-200 focus:bg-gray-700">Administration</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="raisonSociale"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel className="text-gray-200">Raison sociale</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Raison sociale" 
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
          name="nom"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-gray-200">Nom</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nom du client" 
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
    </div>
  );
}