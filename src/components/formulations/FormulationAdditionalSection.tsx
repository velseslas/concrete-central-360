import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormulationForm } from "./FormulationForm";

type FormulationFormValues = React.ComponentProps<typeof FormulationForm>["onSubmit"] extends (data: infer T) => any ? T : never;

interface FormulationAdditionalSectionProps {
  form: UseFormReturn<FormulationFormValues>;
}

export function FormulationAdditionalSection({ form }: FormulationAdditionalSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Additifs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="eau"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eau (L/m³)</FormLabel>
              <FormControl>
                <Input placeholder="175 L/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adjuvant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adjuvant (kg/m³)</FormLabel>
              <FormControl>
                <Input placeholder="2.5 kg/m³" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}