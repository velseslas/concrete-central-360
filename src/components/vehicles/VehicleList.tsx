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
        return "bg-[#9b87f5]/20 text-[#9b87f5]";
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
    <div className="rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-[#2A2F3C] hover:bg-transparent">
            <TableHead className="text-[#7E69AB]">
              <Car className="h-4 w-4 inline-block mr-2" />Véhicule
            </TableHead>
            <TableHead className="text-[#7E69AB]">Immatriculation</TableHead>
            <TableHead className="text-[#7E69AB]">Status</TableHead>
            <TableHead className="text-[#7E69AB]">
              <Calendar className="h-4 w-4 inline-block mr-2" />Documents
            </TableHead>
            <TableHead className="text-[#7E69AB]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockVehicles.map((vehicle) => (
            <motion.tr
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-[#2A2F3C] hover:bg-[#2A2F3C]/50 transition-colors duration-200"
            >
              <TableCell className="font-medium text-[#D6BCFA]">
                {vehicle.brand} {vehicle.model}
              </TableCell>
              <TableCell className="text-[#7E69AB]">{vehicle.licensePlate}</TableCell>
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
                    className="hover:bg-[#9b87f5]/20 hover:text-[#9b87f5] transition-colors"
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