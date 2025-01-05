import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Project {
  id: number;
  clientName: string;
  name: string;
  address: string;
  volume: string;
}

interface ProjectListProps {
  onEdit: (project: Project) => void;
}

const mockProjects: Project[] = [
  {
    id: 1,
    clientName: "Client A",
    name: "Projet A",
    address: "123 Rue Principale",
    volume: "500m³",
  },
  {
    id: 2,
    clientName: "Client B",
    name: "Projet B",
    address: "456 Avenue Secondaire",
    volume: "750m³",
  },
];

export function ProjectList({ onEdit }: ProjectListProps) {
  const handleDelete = (projectId: number) => {
    console.log("Delete project:", projectId);
  };

  return (
    <div className="rounded-md border border-gray-700/50">
      <Table>
        <TableHeader className="bg-gray-900/50 backdrop-blur-xl">
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Client</TableHead>
            <TableHead className="text-gray-300">Nom du chantier</TableHead>
            <TableHead className="text-gray-300">Adresse</TableHead>
            <TableHead className="text-gray-300">Volume</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProjects.map((project) => (
            <TableRow key={project.id} className="border-b border-gray-700/50 hover:bg-gray-800/50 backdrop-blur-xl transition-colors">
              <TableCell className="text-gray-300">{project.clientName}</TableCell>
              <TableCell className="text-gray-300">{project.name}</TableCell>
              <TableCell className="text-gray-300">{project.address}</TableCell>
              <TableCell className="text-gray-300">{project.volume}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(project)}
                    className="hover:bg-gray-700/50"
                  >
                    <Edit className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(project.id)}
                    className="hover:bg-gray-700/50"
                  >
                    <Trash2 className="h-4 w-4 text-gray-300" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}