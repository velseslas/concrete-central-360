
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Vehicle } from "@/types/vehicle";
import { toast } from "sonner";
import { VehicleDetailContent } from "./detail/VehicleDetailContent";
import { VehicleActions } from "./detail/VehicleActions";
import { DocumentsDialog } from "./detail/DocumentsDialog";
import { MaintenanceScheduleDialog } from "./detail/MaintenanceScheduleDialog";
import { MaintenanceHistoryDialog } from "./detail/MaintenanceHistoryDialog";
import { LocationDialog } from "./detail/LocationDialog";
import { EditVehicleDialog } from "./detail/EditVehicleDialog";
import { DeleteVehicleDialog } from "./detail/DeleteVehicleDialog";

interface VehicleDetailSheetProps {
  vehicleId: number | null;
  vehicles: Vehicle[];
  onClose: () => void;
  onStatusChange: (vehicleId: number, newStatus: string) => void;
}

export const VehicleDetailSheet = ({ 
  vehicleId, 
  vehicles, 
  onClose, 
  onStatusChange 
}: VehicleDetailSheetProps) => {
  const vehicle = vehicleId ? vehicles.find(v => v.id === vehicleId) : null;
  
  // États pour contrôler l'ouverture des dialogs
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [maintenanceScheduleOpen, setMaintenanceScheduleOpen] = useState(false);
  const [maintenanceHistoryOpen, setMaintenanceHistoryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Formatage de l'immatriculation en 00000-000-00
  const formatPlate = (plate: string) => {
    // Si le format est déjà correct, on le retourne tel quel
    if (/^\d{5}-\d{3}-\d{2}$/.test(plate)) return plate;
    
    // Sinon, on retourne le format d'origine
    return plate;
  };

  // Gestion de la suppression
  const handleDelete = () => {
    console.log("Suppression du véhicule:", vehicleId);
    toast.success("Véhicule supprimé avec succès");
    setDeleteOpen(false);
    onClose();
  };

  if (!vehicle) return null;

  return (
    <>
      <Sheet 
        open={vehicleId !== null} 
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <SheetContent 
          className="bg-gray-800 border-gray-700 text-white max-w-md overflow-y-auto"
          side="right"
        >
          <SheetHeader className="pb-6">
            <SheetTitle className="text-white text-xl">Détails du véhicule</SheetTitle>
          </SheetHeader>
          
          {/* Contenu principal */}
          <VehicleDetailContent 
            vehicle={vehicle} 
            onStatusChange={onStatusChange} 
            formatPlate={formatPlate} 
          />
          
          {/* Section Actions */}
          <VehicleActions 
            onDocumentsClick={() => setDocumentsOpen(true)}
            onScheduleClick={() => setMaintenanceScheduleOpen(true)}
            onHistoryClick={() => setMaintenanceHistoryOpen(true)}
            onLocationClick={() => setLocationOpen(true)}
            onEditClick={() => setEditOpen(true)}
            onDeleteClick={() => setDeleteOpen(true)}
          />
        </SheetContent>
      </Sheet>

      {/* Dialogs */}
      <DocumentsDialog 
        open={documentsOpen} 
        onOpenChange={setDocumentsOpen} 
      />
      
      <MaintenanceScheduleDialog 
        open={maintenanceScheduleOpen} 
        onOpenChange={setMaintenanceScheduleOpen} 
      />
      
      <MaintenanceHistoryDialog 
        open={maintenanceHistoryOpen} 
        onOpenChange={setMaintenanceHistoryOpen} 
      />
      
      <LocationDialog 
        open={locationOpen} 
        onOpenChange={setLocationOpen} 
      />
      
      <EditVehicleDialog 
        open={editOpen} 
        onOpenChange={setEditOpen} 
        vehicle={vehicle} 
      />
      
      <DeleteVehicleDialog 
        open={deleteOpen} 
        onOpenChange={setDeleteOpen} 
        vehicle={vehicle} 
        onDelete={handleDelete} 
      />
    </>
  );
};
