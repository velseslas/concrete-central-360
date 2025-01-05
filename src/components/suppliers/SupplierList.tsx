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

interface SupplierListProps {
  onEdit: (supplier: any) => void;
  onDelete: (supplierId: number) => void;
}

// Mock data for demonstration
const mockSuppliers = [
  {
    id: 1,
    nom: "Carrière du Nord",
    categorieSupplier: "Fournisseur",
    typeService: "Carrière",
    categorieProduit: "Agrégats",
    telephone: "0123456789",
    email: "contact@carrierenord.com",
  },
  {
    id: 2,
    nom: "Ciments Algérie",
    categorieSupplier: "Fournisseur",
    typeService: "Cimenterie",
    categorieProduit: "Ciment",
    telephone: "0123456789",
    email: "contact@cimentsalgerie.com",
  },
];

export function SupplierList({ onEdit, onDelete }: SupplierListProps) {
  return (
    <div className="rounded-md border border-gray-700/50">
      <Table>
        <TableHeader className="bg-gray-900/50 backdrop-blur-xl">
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Nom</TableHead>
            <TableHead className="text-gray-300">Catégorie</TableHead>
            <TableHead className="text-gray-300">Type de service</TableHead>
            <TableHead className="text-gray-300">Catégorie de produit</TableHead>
            <TableHead className="text-gray-300">Téléphone</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSuppliers.map((supplier) => (
            <TableRow key={supplier.id} className="border-b border-gray-700/50 hover:bg-gray-800/50 backdrop-blur-xl transition-colors">
              <TableCell className="text-gray-300">{supplier.nom}</TableCell>
              <TableCell className="text-gray-300">{supplier.categorieSupplier}</TableCell>
              <TableCell className="text-gray-300">{supplier.typeService}</TableCell>
              <TableCell className="text-gray-300">{supplier.categorieProduit}</TableCell>
              <TableCell className="text-gray-300">{supplier.telephone}</TableCell>
              <TableCell className="text-gray-300">{supplier.email}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(supplier)}
                    className="hover:bg-gray-700/50"
                  >
                    <Edit className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(supplier.id)}
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