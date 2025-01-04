import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeliveryQuantityInfoProps {
  control: Control<any>;
}

export function DeliveryQuantityInfo({ control }: DeliveryQuantityInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantité</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unité</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une unité" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tonnes">Tonnes</SelectItem>
                <SelectItem value="kg">Kilogrammes</SelectItem>
                <SelectItem value="m3">Mètres cubes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}