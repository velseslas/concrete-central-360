
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { useState } from "react";
import { ProjectList } from "./project/ProjectList";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const mockProjects = [
  { 
    id: 1, 
    name: "Chantier 1", 
    client: "Client A", 
    status: "En cours", 
    concreteQuantity: "150",
    createdAt: new Date("2024-01-15").toISOString()
  },
  { 
    id: 2, 
    name: "Chantier 2", 
    client: "Client B", 
    status: "En cours", 
    concreteQuantity: "200",
    createdAt: new Date("2024-02-01").toISOString()
  },
  { 
    id: 3, 
    name: "Chantier 3", 
    client: "Client C", 
    status: "Terminé", 
    concreteQuantity: "300",
    createdAt: new Date("2024-03-10").toISOString()
  },
  { 
    id: 4, 
    name: "Chantier 4", 
    client: "Client D", 
    status: "Terminé", 
    concreteQuantity: "250",
    createdAt: new Date("2024-03-15").toISOString()
  },
];

const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
  { id: "3", name: "Client C" },
  { id: "4", name: "Client D" },
];

const projectFormSchema = z.object({
  name: z.string().min(1, "Le nom du chantier est requis"),
  client: z.string().min(1, "Le client est requis"),
  concreteQuantity: z.string().min(1, "La quantité de béton est requise"),
  status: z.string().min(1, "Le statut est requis"),
});

export function ProjectWidget() {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      client: "",
      concreteQuantity: "",
      status: "En cours",
    },
  });

  const onSubmit = (values: z.infer<typeof projectFormSchema>) => {
    console.log(values);
    toast.success("Chantier créé avec succès");
    form.reset();
    setIsNewProjectOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <Construction className="h-6 w-6 text-[#9b87f5]" />
              Liste des Chantiers
            </CardTitle>
            
            <Sheet open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
              <SheetTrigger asChild>
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-gradient-to-r from-[#9b87f5] to-[#8b77e5] hover:from-[#8b77e5] hover:to-[#7a66d4] text-white shadow-lg hover:shadow-xl h-10 px-4 py-2">
                  <Construction className="h-5 w-5 mr-2" />
                  Nouveau Chantier
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 w-full max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-white">Nouveau Chantier</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Nom du chantier</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                              placeholder="Entrez le nom du chantier" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Client</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                                <SelectValue placeholder="Sélectionnez un client" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              {mockClients.map((client) => (
                                <SelectItem key={client.id} value={client.id}>
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
                      name="concreteQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Quantité de béton (m³)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="number"
                              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                              placeholder="Estimation de la quantité" 
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
                          <FormLabel className="text-gray-200">Statut</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
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
                        onClick={() => setIsNewProjectOpen(false)}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Annuler
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-[#9b87f5] to-[#8b77e5] hover:from-[#8b77e5] hover:to-[#7a66d4] text-white"
                      >
                        Créer le chantier
                      </Button>
                    </div>
                  </form>
                </Form>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <ProjectList projects={mockProjects} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
