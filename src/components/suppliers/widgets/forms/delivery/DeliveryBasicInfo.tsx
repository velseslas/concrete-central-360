import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeliveryBasicInfoProps {
  control: Control<any>;
}

export function DeliveryBasicInfo({ control }: DeliveryBasicInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-200">Informations de base</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de livraison</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie de produit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ciment">Ciment</SelectItem>
                  <SelectItem value="gravier">Gravier</SelectItem>
                  <SelectItem value="sable">Sable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}