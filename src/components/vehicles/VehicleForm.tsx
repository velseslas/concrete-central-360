
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface VehicleFormData {
  brand: string;
  model: string;
  type: string;
  license_plate: string;
  year: string;
}

interface VehicleFormProps {
  onComplete?: () => void;
  initialData?: Partial<VehicleFormData>;
}

const VehicleForm = ({ onComplete, initialData }: VehicleFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VehicleFormData>({
    defaultValues: {
      brand: initialData?.brand || "",
      model: initialData?.model || "",
      type: initialData?.type || "",
      license_plate: initialData?.license_plate || "",
      year: initialData?.year || new Date().getFullYear().toString(),
    },
  });

  const onSubmit = async (data: VehicleFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Form data:", data);
      
      // Simuler une connexion à Supabase pour l'ajout d'un véhicule
      // En production, remplacer par un vrai appel API
      // const { data: vehicle, error } = await supabase
      //   .from("vehicles")
      //   .insert([
      //     {
      //       brand: data.brand,
      //       model: data.model,
      //       type: data.type,
      //       license_plate: data.license_plate,
      //       year: data.year,
      //       status: "active",
      //     },
      //   ])
      //   .select();
      
      // if (error) throw error;

      toast.success("Véhicule ajouté avec succès!");
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
      toast.error("Erreur lors de l'ajout du véhicule");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Marque</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Volvo, Renault, etc."
                    className="bg-gray-700/50 border-gray-600 text-white"
                    {...field}
                  />
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
                <FormLabel className="text-white">Modèle</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="FH16, T High, etc."
                    className="bg-gray-700/50 border-gray-600 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Type de véhicule</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Camion Benne, Chargeuse, etc."
                    className="bg-gray-700/50 border-gray-600 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Année</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="2023"
                    className="bg-gray-700/50 border-gray-600 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="license_plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Immatriculation</FormLabel>
              <FormControl>
                <Input 
                  placeholder="AB-123-CD"
                  className="bg-gray-700/50 border-gray-600 text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onComplete && onComplete()}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white"
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
