
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const projectFormSchema = z.object({
  name: z.string().min(2, "Le nom du chantier est requis"),
  concreteQuantity: z.string().min(1, "La quantité de béton est requise"),
  status: z.string().min(1, "Le statut est requis")
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormDialogProps {
  onSuccess: () => void;
  clientId: number;
}

export function ProjectFormDialog({ onSuccess, clientId }: ProjectFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      concreteQuantity: "",
      status: "En cours"
    }
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Project data:", { ...data, clientId });
      // Here you would typically send the data to your API
      
      toast.success("Chantier créé avec succès");
      onSuccess();
    } catch (error) {
      toast.error("Erreur lors de la création du chantier");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-xl font-semibold text-white">
          Nouveau chantier
        </DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du chantier</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Entrez le nom du chantier" 
                    className="bg-gray-800/50 border-gray-700/50 text-white"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="concreteQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité de béton (m³)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Entrez la quantité de béton" 
                    className="bg-gray-800/50 border-gray-700/50 text-white"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Terminé">Terminé</SelectItem>
                    <SelectItem value="Planifié">Planifié</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={onSuccess}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              {isSubmitting ? "Création..." : "Créer le chantier"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
