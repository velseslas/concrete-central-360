import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Construction } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  name: string;
  address: string;
  volume: string;
  status: string;
}

interface ProjectListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any;
}

// Données mockées pour l'exemple
const mockProjects: Project[] = [
  {
    id: 1,
    name: "Chantier A",
    address: "123 Rue Principale",
    volume: "500m³",
    status: "En cours"
  },
  {
    id: 2,
    name: "Chantier B",
    address: "456 Avenue Secondaire",
    volume: "750m³",
    status: "Terminé"
  }
];

export function ProjectList({ open, onOpenChange, client }: ProjectListProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
            <Construction className="h-6 w-6 text-blue-400" />
            Chantiers de {client?.nom}
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <div className="rounded-lg border border-gray-700/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800/50">
                <TableRow className="border-gray-700/50">
                  <TableHead className="text-gray-300">Nom</TableHead>
                  <TableHead className="text-gray-300">Adresse</TableHead>
                  <TableHead className="text-gray-300">Volume</TableHead>
                  <TableHead className="text-gray-300">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProjects.map((project) => (
                  <TableRow 
                    key={project.id}
                    className="border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="text-gray-200">{project.name}</TableCell>
                    <TableCell className="text-gray-200">{project.address}</TableCell>
                    <TableCell className="text-gray-200">{project.volume}</TableCell>
                    <TableCell className="text-gray-200">{project.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}