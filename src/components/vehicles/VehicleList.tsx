import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Car, Calendar, FileWarning } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    status: "En service",
  },
  {
    id: 2,
    brand: "Volvo",
    model: "FH16",
    licensePlate: "456 DEF 16",
    insuranceExpiry: "2024-11-30",
    technicalControlExpiry: "2024-05-31",
    circulationPermitExpiry: "2024-11-30",
    status: "En maintenance",
  },
];

const VehicleList = ({ onEdit }: VehicleListProps) => {
  const handleDelete = (id: number) => {
    console.log("Deleting vehicle:", id);
    toast.success("Véhicule supprimé avec succès");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "en service":
        return "bg-green-500/20 text-green-500";
      case "en maintenance":
        return "bg-yellow-500/20 text-yellow-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const isDocumentExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-xl">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-400"><Car className="h-4 w-4 inline-block mr-2" />Véhicule</TableHead>
            <TableHead className="text-gray-400">Immatriculation</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400"><Calendar className="h-4 w-4 inline-block mr-2" />Documents</TableHead>
            <TableHead className="text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockVehicles.map((vehicle) => (
            <motion.tr
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-gray-800 bg-gray-900/30 hover:bg-gray-800/50 transition-colors duration-200"
            >
              <TableCell className="font-medium text-gray-200">
                {vehicle.brand} {vehicle.model}
              </TableCell>
              <TableCell className="text-gray-300">{vehicle.licensePlate}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {isDocumentExpiringSoon(vehicle.insuranceExpiry) && (
                    <div className="flex items-center text-yellow-500">
                      <FileWarning className="h-4 w-4 mr-1" />
                      <span className="text-sm">Assurance</span>
                    </div>
                  )}
                  {isDocumentExpiringSoon(vehicle.technicalControlExpiry) && (
                    <div className="flex items-center text-yellow-500">
                      <FileWarning className="h-4 w-4 mr-1" />
                      <span className="text-sm">Contrôle technique</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(vehicle)}
                    className="hover:bg-blue-500/20 hover:text-blue-500 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(vehicle.id)}
                    className="hover:bg-red-500/20 hover:text-red-500 transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleList;