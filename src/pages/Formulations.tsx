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
          <Button 
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle formulation
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 hover:bg-gray-800/70 transition-all duration-200"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Total Formulations</h3>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {formulations.length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 hover:bg-gray-800/70 transition-all duration-200"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Formulations Actives</h3>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              {formulations.filter((f) => f.status === "Active").length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 hover:bg-gray-800/70 transition-all duration-200"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Dernière mise à jour</h3>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Aujourd'hui
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700/50">
                <TableHead className="text-gray-300">Nom</TableHead>
                <TableHead className="text-gray-300">Résistance</TableHead>
                <TableHead className="text-gray-300">Ciment</TableHead>
                <TableHead className="text-center bg-blue-900/20 text-gray-300" colSpan={3}>
                  Sables
                </TableHead>
                <TableHead className="text-center bg-gray-700/20 text-gray-300" colSpan={3}>
                  Graviers
                </TableHead>
                <TableHead className="text-center bg-green-900/20 text-gray-300" colSpan={2}>
                  Additifs
                </TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
              <TableRow className="border-b border-gray-700/50">
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="bg-blue-900/20 text-gray-400">0/1</TableHead>
                <TableHead className="bg-blue-900/20 text-gray-400">0/3</TableHead>
                <TableHead className="bg-blue-900/20 text-gray-400">0/4</TableHead>
                <TableHead className="bg-gray-700/20 text-gray-400">3/8</TableHead>
                <TableHead className="bg-gray-700/20 text-gray-400">8/15</TableHead>
                <TableHead className="bg-gray-700/20 text-gray-400">15/25</TableHead>
                <TableHead className="bg-green-900/20 text-gray-400">Eau</TableHead>
                <TableHead className="bg-green-900/20 text-gray-400">Adjuvant</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formulations.map((formulation) => (
                <TableRow 
                  key={formulation.id} 
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-gray-300">{formulation.nom}</TableCell>
                  <TableCell className="text-gray-300">{formulation.resistance}</TableCell>
                  <TableCell className="text-gray-300">{formulation.ciment}</TableCell>
                  <TableCell className="bg-blue-900/10 text-gray-300">{formulation.sable01}</TableCell>
                  <TableCell className="bg-blue-900/10 text-gray-300">{formulation.sable03}</TableCell>
                  <TableCell className="bg-blue-900/10 text-gray-300">{formulation.sable04}</TableCell>
                  <TableCell className="bg-gray-700/10 text-gray-300">{formulation.gravier38}</TableCell>
                  <TableCell className="bg-gray-700/10 text-gray-300">{formulation.gravier815}</TableCell>
                  <TableCell className="bg-gray-700/10 text-gray-300">{formulation.gravier1525}</TableCell>
                  <TableCell className="bg-green-900/10 text-gray-300">{formulation.eau}</TableCell>
                  <TableCell className="bg-green-900/10 text-gray-300">{formulation.adjuvant}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                      {formulation.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

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