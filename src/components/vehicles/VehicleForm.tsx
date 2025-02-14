
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const vehicleSchema = z.object({
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  type: z.string().min(1, "Le type de véhicule est requis"),
  year: z.string().min(1, "L'année est requise"),
  license_plate: z.string().min(1, "L'immatriculation est requise"),
  status: z.string().default("active"),
});

interface VehicleFormProps {
  onClose: () => void;
  initialData?: any;
}

const VehicleForm = ({ onClose, initialData }: VehicleFormProps) => {
  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || {
      brand: "",
      model: "",
      type: "",
      year: "",
      license_plate: "",
      status: "active",
    },
  });

  const onSubmit = async (values: z.infer<typeof vehicleSchema>) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .insert([values]);

      if (error) throw error;

      toast.success(initialData ? "Véhicule modifié" : "Véhicule ajouté");
      onClose();
    } catch (error) {
      console.error("Error submitting vehicle:", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marque</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Renault" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modèle</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Clio" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de véhicule</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="car">Voiture</SelectItem>
                  <SelectItem value="truck">Camion</SelectItem>
                  <SelectItem value="van">Utilitaire</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: 2020" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="license_plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Immatriculation</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: AB-123-CD" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
