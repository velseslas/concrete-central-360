import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <DialogContent className="sm:max-w-[500px] bg-gray-900/95 backdrop-blur-xl border-gray-800">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-100">
          Nouveau Chantier
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Client</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-gray-200">
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {clients.map((client) => (
                      <SelectItem 
                        key={client.id} 
                        value={client.id}
                        className="text-gray-200 focus:bg-gray-700 focus:text-gray-100"
                      >
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Nom du chantier</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nom du chantier" 
                    className="bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Adresse du chantier</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Adresse" 
                    className="bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500"
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
                <FormLabel className="text-gray-200">Quantité de béton (M3)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Quantité en M3" 
                    className="bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-800">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 border-gray-700"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Créer
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}