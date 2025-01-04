import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const projectSchema = z.object({
  clientId: z.string().min(1, "Veuillez sélectionner un client"),
  name: z.string().min(2, "Le nom du chantier est requis"),
  address: z.string().min(5, "L'adresse est requise"),
  concreteQuantity: z.string().min(1, "La quantité de béton est requise"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Array<{ id: string; name: string; }>;
}

export function ProjectFormDialog({ open, onOpenChange, clients }: ProjectFormDialogProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      clientId: "",
      name: "",
      address: "",
      concreteQuantity: "",
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    console.log("Nouveau chantier:", data);
    toast.success("Chantier créé avec succès");
    onOpenChange(false);
    form.reset();
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Nouveau Chantier</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du chantier</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du chantier" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
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
            name="concreteQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité de béton (M3)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantité en M3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}