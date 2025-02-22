
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { useState } from "react";
import { ProjectList } from "./project/ProjectList";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

const formSchema = z.object({
  name: z.string().min(1, "Le nom du chantier est requis"),
  client: z.string().min(1, "Le nom du client est requis"),
  concreteQuantity: z.string().min(1, "La quantité de béton est requise"),
});

export function ProjectWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
      concreteQuantity: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast.success("Chantier créé avec succès");
    setIsOpen(false);
    form.reset();
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
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-[#9b87f5] to-[#8b77e5] hover:from-[#8b77e5] hover:to-[#7a66d4] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Construction className="h-5 w-5" />
                  Nouveau Chantier
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gray-900/95 border-gray-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Nouveau Chantier</SheetTitle>
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
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Client</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                              placeholder="Nom du client" 
                            />
                          </FormControl>
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
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2 pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setIsOpen(false)}
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
