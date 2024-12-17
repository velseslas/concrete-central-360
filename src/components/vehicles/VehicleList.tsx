import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface VehicleListProps {
  onEdit: (vehicle: any) => void;
}

const mockVehicles = [
  {
    id: 1,
    brand: "Mercedes",
    model: "Actros",
    licensePlate: "123 ABC 16",
    insuranceExpiry: "2024-12-31",
    technicalControlExpiry: "2024-06-30",
    circulationPermitExpiry: "2024-12-31",
  },
  // Add more mock vehicles as needed
];

const VehicleList = ({ onEdit }: VehicleListProps) => {
  const handleDelete = (id: number) => {
    console.log("Deleting vehicle:", id);
    toast.success("Véhicule supprimé");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Marque</TableHead>
          <TableHead>Modèle</TableHead>
          <TableHead>Immatriculation</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockVehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.brand}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.licensePlate}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(vehicle)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(vehicle.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VehicleList;