
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface ProfessionalInfoTabProps {
  form: UseFormReturn<any>;
}

export function ProfessionalInfoTab({ form }: ProfessionalInfoTabProps) {
  return (
    <div className="space-y-5 mt-5">
      <h3 className="text-xl font-semibold text-center mb-4">Informations professionnelles</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Poste</FormLabel>
              <FormControl>
                <Input placeholder="Poste occupé" {...field} className="bg-gray-700 border-gray-600 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Département</FormLabel>
              <FormControl>
                <Input placeholder="Département" {...field} className="bg-gray-700 border-gray-600 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Date d'embauche</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="bg-gray-700 border-gray-600 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Statut</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-base">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="onleave">En congé</SelectItem>
                  <SelectItem value="probation">Période d'essai</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Salaire (DA)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Montant du salaire" 
                {...field} 
                className="bg-gray-700 border-gray-600 text-base" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
