import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { OrderFormValues } from "./types";

interface ClientProjectFieldsProps {
  form: UseFormReturn<OrderFormValues>;
  mockClients: { id: string; name: string; }[];
  mockProjects: { id: string; name: string; }[];
}

export function ClientProjectFields({ form, mockClients, mockProjects }: ClientProjectFieldsProps) {
  console.log("ClientProjectFields rendered");

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="clientId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Client</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-gray-800 border-gray-700">
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id} className="text-white hover:bg-gray-700">
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="projectId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Chantier</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Sélectionner un chantier" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-gray-800 border-gray-700">
                {mockProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id} className="text-white hover:bg-gray-700">
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
}