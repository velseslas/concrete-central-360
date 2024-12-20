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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Nom du chantier</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.clientName}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.address}</TableCell>
              <TableCell>{project.volume}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(project)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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