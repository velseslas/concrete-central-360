import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const vehicleSchema = z.object({
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  licensePlate: z.string().min(1, "L'immatriculation est requise"),
  insuranceExpiry: z.string().min(1, "La date d'expiration de l'assurance est requise"),
  technicalControlExpiry: z.string().min(1, "La date d'expiration du contrôle technique est requise"),
  circulationPermitExpiry: z.string().min(1, "La date d'expiration du permis de circulation est requise"),
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
      licensePlate: "",
      insuranceExpiry: "",
      technicalControlExpiry: "",
      circulationPermitExpiry: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof vehicleSchema>) => {
    try {
      console.log("Submitting vehicle:", values);
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Immatriculation</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insuranceExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date d'expiration de l'assurance</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technicalControlExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date d'expiration du contrôle technique</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="circulationPermitExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date d'expiration du permis de circulation</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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