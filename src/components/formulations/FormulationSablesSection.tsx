import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormulationForm } from "./FormulationForm";

type FormulationFormValues = React.ComponentProps<typeof FormulationForm>["onSubmit"] extends (data: infer T) => any ? T : never;

interface FormulationSablesSectionProps {
  form: UseFormReturn<FormulationFormValues>;
}

export function FormulationSablesSection({ form }: FormulationSablesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
        Sables
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="sable01"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Sable 0/1 (kg/m³)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="200 kg/m³" 
                  {...field} 
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sable03"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Sable 0/3 (kg/m³)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="300 kg/m³" 
                  {...field} 
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sable04"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Sable 0/4 (kg/m³)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="300 kg/m³" 
                  {...field} 
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
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