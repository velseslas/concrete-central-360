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

interface BusinessType {
  id: number;
  name: string;
  description: string;
}

const mockBusinessTypes: BusinessType[] = [
  {
    id: 1,
    name: "SARL",
    description: "Société à responsabilité limitée",
  },
  {
    id: 2,
    name: "EURL",
    description: "Entreprise unipersonnelle à responsabilité limitée",
  },
];

export function BusinessTypeList() {
  return (
    <div className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900/50 backdrop-blur-xl">
          <TableRow className="border-b border-gray-700 hover:bg-gray-800/50">
            <TableHead className="text-gray-300">Nom</TableHead>
            <TableHead className="text-gray-300">Description</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBusinessTypes.map((type) => (
            <TableRow key={type.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200">
              <TableCell className="text-gray-300">{type.name}</TableCell>
              <TableCell className="text-gray-300">{type.description}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-gray-700/50"
                >
                  <Edit className="h-4 w-4 text-gray-300" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-gray-700/50"
                >
                  <Trash2 className="h-4 w-4 text-gray-300" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}