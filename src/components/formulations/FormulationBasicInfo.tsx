import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormulationForm } from "./FormulationForm";

type FormulationFormValues = React.ComponentProps<typeof FormulationForm>["onSubmit"] extends (data: infer T) => any ? T : never;

interface FormulationBasicInfoProps {
  form: UseFormReturn<FormulationFormValues>;
}

export function FormulationBasicInfo({ form }: FormulationBasicInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Informations de base
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Nom</FormLabel>
              <FormControl>
                <Input 
                  placeholder="B25" 
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
          name="resistance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Résistance (MPa)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="25 MPa" 
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
          name="ciment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Ciment (kg/m³)</FormLabel>
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