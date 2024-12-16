import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormulationFormValues } from "./FormulationForm";

interface FormulationSablesSectionProps {
  form: UseFormReturn<FormulationFormValues>;
}

export function FormulationSablesSection({ form }: FormulationSablesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Sables</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="sable01"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sable 0/1 (kg/m³)</FormLabel>
              <FormControl>
                <Input placeholder="200 kg/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sable03"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sable 0/3 (kg/m³)</FormLabel>
              <FormControl>
                <Input placeholder="300 kg/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sable04"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sable 0/4 (kg/m³)</FormLabel>
              <FormControl>
                <Input placeholder="300 kg/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}