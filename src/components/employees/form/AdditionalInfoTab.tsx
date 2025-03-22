
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface AdditionalInfoTabProps {
  form: UseFormReturn<any>;
}

export function AdditionalInfoTab({ form }: AdditionalInfoTabProps) {
  return (
    <div className="space-y-5 mt-5">
      <h3 className="text-xl font-semibold text-center mb-4">Informations complémentaires</h3>
      
      <FormField
        control={form.control}
        name="emergencyContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Contact d'urgence</FormLabel>
            <FormControl>
              <Input placeholder="Nom, relation et numéro de téléphone" {...field} className="bg-gray-700 border-gray-600 text-base" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="bankDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Coordonnées bancaires</FormLabel>
            <FormControl>
              <Input placeholder="Détails du compte bancaire" {...field} className="bg-gray-700 border-gray-600 text-base" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Informations supplémentaires"
                className="resize-none bg-gray-700 border-gray-600 min-h-[120px] text-base"
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
