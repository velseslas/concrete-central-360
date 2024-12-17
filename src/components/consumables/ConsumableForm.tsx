import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const consumableSchema = z.object({
  date: z.string().min(1, "La date est requise"),
  type: z.string().min(1, "Le type est requis"),
  vehicle: z.string().min(1, "Le véhicule/équipement est requis"),
  quantity: z.string().min(1, "La quantité est requise"),
  unit: z.string().min(1, "L'unité est requise"),
  cost: z.string().min(1, "Le coût est requis"),
});

interface ConsumableFormProps {
  onClose: () => void;
  initialData?: any;
}

const ConsumableForm = ({ onClose, initialData }: ConsumableFormProps) => {
  const form = useForm<z.infer<typeof consumableSchema>>({
    resolver: zodResolver(consumableSchema),
    defaultValues: initialData || {
      date: "",
      type: "",
      vehicle: "",
      quantity: "",
      unit: "L",
      cost: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof consumableSchema>) => {
    try {
      console.log("Submitting consumable:", values);
      toast.success(initialData ? "Consommation modifiée" : "Consommation ajoutée");
      onClose();
    } catch (error) {
      console.error("Error submitting consumable:", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Carburant">Carburant</SelectItem>
                  <SelectItem value="Huile">Huile</SelectItem>
                  <SelectItem value="Filtre">Filtre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Véhicule/Équipement</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Sélectionner le véhicule ou l'équipement" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner l'unité" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="L">Litres (L)</SelectItem>
                  <SelectItem value="KG">Kilogrammes (KG)</SelectItem>
                  <SelectItem value="U">Unités (U)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coût (DA)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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

export default ConsumableForm;