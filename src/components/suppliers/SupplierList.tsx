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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Type de service</TableHead>
            <TableHead>Catégorie de produit</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSuppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.nom}</TableCell>
              <TableCell>{supplier.categorieSupplier}</TableCell>
              <TableCell>{supplier.typeService}</TableCell>
              <TableCell>{supplier.categorieProduit}</TableCell>
              <TableCell>{supplier.telephone}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(supplier)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(supplier.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}