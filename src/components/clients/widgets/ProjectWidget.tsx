import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Construction, Plus } from "lucide-react";
import { useState } from "react";
import { ProjectFilters } from "./project/ProjectFilters";
import { ProjectList } from "./project/ProjectList";
import { ProjectStats } from "./project/ProjectStats";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
  { id: "3", name: "Client C" },
];

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

const formSchema = z.object({
  client: z.string({ required_error: "Veuillez sélectionner un client" }),
  name: z.string().min(1, "Le nom du chantier est requis"),
  concreteQuantity: z.string().min(1, "L'estimation de béton est requise"),
});

export function ProjectWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: "",
      name: "",
      concreteQuantity: "",
    },
  });

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClient = selectedClient === "all" || project.client === mockClients.find(c => c.id === selectedClient)?.name;
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    const matchesYear = selectedYear === "all" || new Date(project.createdAt).getFullYear().toString() === selectedYear;

    return matchesSearch && matchesClient && matchesStatus && matchesYear;
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form values:", values);
      toast.success("Chantier créé avec succès");
      setIsNewProjectOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ProjectStats projects={filteredProjects} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-white flex items-center gap-2">
                <Construction className="h-6 w-6 text-[#9b87f5]" />
                Liste des Chantiers
              </CardTitle>
              <div className="flex items-center gap-4">
                <Sheet open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      type="button"
                      variant="ghost" 
                      className="bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 text-[#9b87f5] cursor-pointer"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Nouveau Chantier
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    className="bg-gray-900/95 border-gray-800"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-white">Nouveau Chantier</SheetTitle>
                    </SheetHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
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
                                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Sélectionner un client" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  {mockClients.map((client) => (
                                    <SelectItem 
                                      key={client.id} 
                                      value={client.id}
                                      className="text-white hover:bg-gray-700"
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
                                  {...field} 
                                  className="bg-gray-800 border-gray-700 text-white"
                                  placeholder="Entrer le nom du chantier" 
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
                              <FormLabel className="text-gray-200">Estimation de béton (m³)</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700 text-white"
                                  placeholder="Ex: 150" 
                                  type="number"
                                />
                              </FormControl>
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
                            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
                          >
                            Créer le chantier
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </SheetContent>
                </Sheet>
                <ProjectFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  selectedClient={selectedClient}
                  setSelectedClient={setSelectedClient}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  clients={mockClients}
                  showSearchOnly={true}
                  projects={filteredProjects}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProjectFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              clients={mockClients}
              showSearchOnly={false}
              projects={filteredProjects}
            />
            <ProjectList projects={filteredProjects} />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
