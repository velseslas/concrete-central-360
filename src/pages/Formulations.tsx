import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormulationForm } from "@/components/formulations/FormulationForm";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Formulations = () => {
  const [formulations, setFormulations] = useState([
    {
      id: 1,
      nom: "B25",
      resistance: "25 MPa",
      ciment: "350 kg/m³",
      sable01: "200 kg/m³",
      sable03: "300 kg/m³",
      sable04: "300 kg/m³",
      gravier38: "350 kg/m³",
      gravier815: "350 kg/m³",
      gravier1525: "350 kg/m³",
      eau: "175 L/m³",
      adjuvant: "2.5 kg/m³",
      status: "Active",
    },
  ]);

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    const newFormulation = {
      id: formulations.length + 1,
      ...data,
      status: "Active",
    };

    setFormulations([...formulations, newFormulation]);
    setOpen(false);
    toast({
      title: "Formulation créée",
      description: "La nouvelle formulation a été ajoutée avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Formulations
            </h1>
            <p className="text-gray-400">Gérez vos formulations de béton</p>
          </div>
          <Button className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle formulation
          </Button>
        </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-dashboard">
          <h3 className="text-lg font-semibold mb-2">Total Formulations</h3>
          <p className="text-3xl font-bold text-primary">{formulations.length}</p>
        </div>
        <div className="card-dashboard">
          <h3 className="text-lg font-semibold mb-2">Formulations Actives</h3>
          <p className="text-3xl font-bold text-green-600">
            {formulations.filter((f) => f.status === "Active").length}
          </p>
        </div>
        <div className="card-dashboard">
          <h3 className="text-lg font-semibold mb-2">Dernière mise à jour</h3>
          <p className="text-3xl font-bold text-blue-600">Aujourd'hui</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Résistance</TableHead>
              <TableHead>Ciment</TableHead>
              <TableHead className="text-center bg-blue-50" colSpan={3}>
                Sables
              </TableHead>
              <TableHead className="text-center bg-gray-50" colSpan={3}>
                Graviers
              </TableHead>
              <TableHead className="text-center bg-green-50" colSpan={2}>
                Additifs
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="bg-blue-50">0/1</TableHead>
              <TableHead className="bg-blue-50">0/3</TableHead>
              <TableHead className="bg-blue-50">0/4</TableHead>
              <TableHead className="bg-gray-50">3/8</TableHead>
              <TableHead className="bg-gray-50">8/15</TableHead>
              <TableHead className="bg-gray-50">15/25</TableHead>
              <TableHead className="bg-green-50">Eau</TableHead>
              <TableHead className="bg-green-50">Adjuvant</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formulations.map((formulation) => (
              <TableRow key={formulation.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{formulation.nom}</TableCell>
                <TableCell>{formulation.resistance}</TableCell>
                <TableCell>{formulation.ciment}</TableCell>
                <TableCell className="bg-blue-50/50">{formulation.sable01}</TableCell>
                <TableCell className="bg-blue-50/50">{formulation.sable03}</TableCell>
                <TableCell className="bg-blue-50/50">{formulation.sable04}</TableCell>
                <TableCell className="bg-gray-50/50">{formulation.gravier38}</TableCell>
                <TableCell className="bg-gray-50/50">{formulation.gravier815}</TableCell>
                <TableCell className="bg-gray-50/50">{formulation.gravier1525}</TableCell>
                <TableCell className="bg-green-50/50">{formulation.eau}</TableCell>
                <TableCell className="bg-green-50/50">{formulation.adjuvant}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {formulation.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FormulationForm 
        open={open} 
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
      </motion.div>
    </div>
  );
};

export default Formulations;
