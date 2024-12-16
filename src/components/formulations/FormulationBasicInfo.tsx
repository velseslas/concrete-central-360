import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormulationFormValues } from "./FormulationForm";

interface FormulationBasicInfoProps {
  form: UseFormReturn<FormulationFormValues>;
}

export function FormulationBasicInfo({ form }: FormulationBasicInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="nom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input placeholder="B25" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="resistance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Résistance (MPa)</FormLabel>
            <FormControl>
              <Input placeholder="25 MPa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ciment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ciment (kg/m³)</FormLabel>
            <FormControl>
              <Input placeholder="350 kg/m³" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}