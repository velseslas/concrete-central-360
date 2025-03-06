
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface AdditionalInfoTabProps {
  form: UseFormReturn<any>;
}

export function AdditionalInfoTab({ form }: AdditionalInfoTabProps) {
  return (
    <div className="space-y-4 mt-4">
      <FormField
        control={form.control}
        name="emergencyContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact d'urgence</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Nom, relation, numéro de téléphone"
                className="resize-none bg-gray-700 border-gray-600"
                {...field}
              />
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
            <FormLabel>Coordonnées bancaires</FormLabel>
            <FormControl>
              <Input placeholder="IBAN" {...field} className="bg-gray-700 border-gray-600" />
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
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Informations supplémentaires"
                className="resize-none bg-gray-700 border-gray-600"
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
