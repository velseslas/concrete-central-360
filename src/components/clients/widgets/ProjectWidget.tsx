import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
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

// Mock data for demonstration
const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
  { id: "3", name: "Client C" },
];

const mockProjects = [
  { id: 1, name: "Chantier 1", client: "Client A", status: "En cours", concreteQuantity: "150" },
  { id: 2, name: "Chantier 2", client: "Client B", status: "En cours", concreteQuantity: "200" },
  { id: 3, name: "Chantier 3", client: "Client C", status: "Terminé", concreteQuantity: "300" },
];

export function ProjectWidget() {
  const [open, setOpen] = useState(false);
  
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
    setOpen(false);
    form.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <Construction className="h-6 w-6" />
              Chantiers
            </CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                  Nouveau Chantier
                </Button>
              </DialogTrigger>
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
                              {mockClients.map((client) => (
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
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">Créer</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Chantiers en cours
                </h3>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Chantiers terminés
                </h3>
                <p className="text-2xl font-bold text-white">45</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Liste des chantiers</h3>
              <div className="space-y-2">
                {mockProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-white">{project.name}</p>
                      <p className="text-sm text-white/80">{project.client} - {project.concreteQuantity}m³</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-white/20 text-white border border-white/30">
                      {project.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}