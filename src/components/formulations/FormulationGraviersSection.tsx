import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormulationFormValues } from "./FormulationForm";

interface FormulationGraviersSectionProps {
  form: UseFormReturn<FormulationFormValues>;
}

export function FormulationGraviersSection({ form }: FormulationGraviersSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Graviers</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="gravier38"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gravier 3/8 (kg/m³)</FormLabel>
              <FormControl>
                <Input placeholder="350 kg/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gravier815"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gravier 8/15 (kg/m³)</FormLabel>
              <FormControl>
                <Input placeholder="350 kg/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gravier1525"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gravier 15/25 (kg/m³)</FormLabel>
              <FormControl>
                <Input placeholder="350 kg/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}