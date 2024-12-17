import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const projectSchema = z.object({
  adresse: z.string().min(5, "L'adresse est requise"),
  delais: z.string().min(1, "Les délais sont requis"),
  contraintes: z.string(),
  volumeBeton: z.string().min(1, "Le volume de béton est requis"),
  categorieProduit: z.string().min(1, "La catégorie de produit est requise"),
  prix: z.string().min(1, "Le prix est requis"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
  projectToEdit?: ProjectFormValues;
}

export function ProjectForm({ open, onOpenChange, clientId, projectToEdit }: ProjectFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: projectToEdit || {
      adresse: "",
      delais: "",
      contraintes: "",
      volumeBeton: "",
      categorieProduit: "",
      prix: "",
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    console.log("Project data:", { ...data, clientId });
    // TODO: Implement project creation/update logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {projectToEdit ? "Modifier le chantier" : "Nouveau chantier"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du chantier</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Délais</FormLabel>
                  <FormControl>
                    <Input placeholder="Délais" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contraintes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraintes spécifiques</FormLabel>
                  <FormControl>
                    <Input placeholder="Contraintes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="volumeBeton"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume de béton requis (m³)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Volume" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categorieProduit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie de produit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beton">Béton</SelectItem>
                      <SelectItem value="pompe">Pompe à béton</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="melange">Mélange</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix spécifique</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Prix" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {projectToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}