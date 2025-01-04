import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormulationForm } from "./FormulationForm";

type FormulationFormValues = React.ComponentProps<typeof FormulationForm>["onSubmit"] extends (data: infer T) => any ? T : never;

interface FormulationGraviersSectionProps {
  form: UseFormReturn<FormulationFormValues>;
}

export function FormulationGraviersSection({ form }: FormulationGraviersSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200">
        Graviers
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="gravier38"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Gravier 3/8 (kg/m³)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="350 kg/m³" 
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
          name="gravier815"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Gravier 8/15 (kg/m³)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="350 kg/m³" 
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
          name="gravier1525"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Gravier 15/25 (kg/m³)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="350 kg/m³" 
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