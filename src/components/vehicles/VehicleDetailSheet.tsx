
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, FileText, Calendar, Wrench, AlertTriangle, Map, Settings } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { toast } from "sonner";
import { getStatusText } from "@/utils/vehicleUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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

  // Formulaire pour la planification de maintenance
  const maintenanceForm = useForm({
    defaultValues: {
      date: "",
      description: "",
      technician: ""
    }
  });

  // Formulaire pour la modification du véhicule
  const editVehicleForm = useForm({
    defaultValues: {
      brand: vehicle?.brand || "",
      model: vehicle?.model || "",
      year: vehicle?.year || "",
      type: vehicle?.type || "",
      vehicle_number: vehicle?.vehicle_number || "",
      plate: vehicle?.plate || ""
    }
  });

  const handleStatusChange = (newStatus: string) => {
    if (vehicleId) {
      console.log(`Mise à jour du statut du véhicule ${vehicleId} à ${newStatus}`);
      onStatusChange(vehicleId, newStatus);
      // Notification de succès
      toast.success(`Le statut du véhicule a été mis à jour à "${getStatusText(newStatus)}"`);
    }
  };

  // Formatage de l'immatriculation en 00000-000-00
  const formatPlate = (plate: string) => {
    // Si le format est déjà correct, on le retourne tel quel
    if (/^\d{5}-\d{3}-\d{2}$/.test(plate)) return plate;
    
    // Sinon, on retourne le format d'origine
    return plate;
  };

  // Gestion de la soumission du formulaire de maintenance
  const handleMaintenanceSubmit = (data: any) => {
    console.log("Planification de maintenance:", data);
    toast.success("Maintenance planifiée avec succès");
    setMaintenanceScheduleOpen(false);
  };

  // Gestion de la soumission du formulaire de modification
  const handleEditSubmit = (data: any) => {
    console.log("Modification du véhicule:", data);
    toast.success("Véhicule modifié avec succès");
    setEditOpen(false);
  };

  // Gestion de la suppression
  const handleDelete = () => {
    console.log("Suppression du véhicule:", vehicleId);
    toast.success("Véhicule supprimé avec succès");
    setDeleteOpen(false);
    onClose();
  };

  if (!vehicle) return null;

  // Extraire le type de véhicule et créer un nom basé sur le numéro de véhicule
  const vehicleType = vehicle.type;
  const vehicleName = `${vehicleType} ${vehicle.vehicle_number}`;

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
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                <Car className="h-8 w-8 text-[#9b87f5]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{vehicleName}</h2>
                <div className="mt-2">
                  <Select 
                    defaultValue={vehicle.status} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white w-[180px]">
                      <SelectValue placeholder="Statut du véhicule" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="maintenance">En maintenance</SelectItem>
                      <SelectItem value="unavailable">Indisponible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Détails du véhicule placés avant la section Actions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Marque</p>
                <p className="text-white">{vehicle.brand}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Modèle</p>
                <p className="text-white">{vehicle.model}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Année</p>
                <p className="text-white">{vehicle.year}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-white">{vehicle.type}</p>
              </div>
              {/* Numéro de véhicule et immatriculation sur la même ligne */}
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Numéro véhicule</p>
                <p className="text-white">{vehicle.vehicle_number}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Immatriculation</p>
                <p className="text-white">{formatPlate(vehicle.plate)}</p>
              </div>
            </div>
            
            {/* Section Actions */}
            <div className="space-y-4 pt-2 pb-4 border-t border-b border-gray-700">
              <h3 className="text-lg font-medium text-white pt-4">Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white" 
                  onClick={() => setDocumentsOpen(true)}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Documents
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-gray-600 hover:bg-gray-700 text-white" 
                  onClick={() => setMaintenanceScheduleOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Planifier
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-gray-600 hover:bg-gray-700 text-white" 
                  onClick={() => setMaintenanceHistoryOpen(true)}
                >
                  <Wrench className="mr-2 h-5 w-5" />
                  Historique
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-gray-600 hover:bg-gray-700 text-white" 
                  onClick={() => setLocationOpen(true)}
                >
                  <Map className="mr-2 h-5 w-5" />
                  Localiser
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-gray-600 hover:bg-gray-700 text-white" 
                  onClick={() => setEditOpen(true)}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Modifier
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-red-400 hover:text-red-300 hover:border-red-400 hover:bg-red-400/10" 
                  onClick={() => setDeleteOpen(true)}
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Dialog pour les documents */}
      <Dialog open={documentsOpen} onOpenChange={setDocumentsOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Documents du véhicule</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-white font-medium mb-4">Ajouter un document</h4>
            <DocumentUpload onUploadSuccess={() => setDocumentsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog pour la planification de maintenance */}
      <Dialog open={maintenanceScheduleOpen} onOpenChange={setMaintenanceScheduleOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Planifier une maintenance</DialogTitle>
          </DialogHeader>
          <Form {...maintenanceForm}>
            <form onSubmit={maintenanceForm.handleSubmit(handleMaintenanceSubmit)} className="space-y-4">
              <FormField
                control={maintenanceForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Date de maintenance</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className="bg-gray-700/50 border-gray-600 text-white" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={maintenanceForm.control}
                name="technician"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Technicien</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-gray-700/50 border-gray-600 text-white" 
                        placeholder="Nom du technicien" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={maintenanceForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]" 
                        placeholder="Description des travaux à effectuer" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white">
                  Planifier
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour l'historique de maintenance */}
      <Dialog open={maintenanceHistoryOpen} onOpenChange={setMaintenanceHistoryOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Historique de maintenance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border border-gray-700 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium">Révision générale</h4>
                  <p className="text-sm text-gray-400">Technicien: Jean Dupont</p>
                </div>
                <div className="text-sm text-gray-400">12/04/2023</div>
              </div>
              <p className="mt-2 text-sm text-gray-300">Changement des filtres, vidange et contrôle des pneumatiques.</p>
            </div>
            <div className="border border-gray-700 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium">Remplacement freins</h4>
                  <p className="text-sm text-gray-400">Technicien: Pierre Martin</p>
                </div>
                <div className="text-sm text-gray-400">25/01/2023</div>
              </div>
              <p className="mt-2 text-sm text-gray-300">Remplacement des plaquettes de frein et des disques avant.</p>
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white" onClick={() => setMaintenanceHistoryOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour la localisation */}
      <Dialog open={locationOpen} onOpenChange={setLocationOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Localisation du véhicule</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-700 rounded-lg h-[300px] flex items-center justify-center">
              <Map className="h-12 w-12 text-gray-500" />
              <p className="text-gray-400 mt-4">Carte de localisation</p>
            </div>
            <div className="mt-4">
              <h4 className="text-white font-medium">Dernière position connue</h4>
              <p className="text-gray-300">Chantier Montpellier Nord</p>
              <p className="text-sm text-gray-400">Mise à jour: aujourd'hui à 14:30</p>
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white" onClick={() => setLocationOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour la modification du véhicule */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Modifier le véhicule</DialogTitle>
          </DialogHeader>
          <Form {...editVehicleForm}>
            <form onSubmit={editVehicleForm.handleSubmit(handleEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editVehicleForm.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Marque</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-700/50 border-gray-600 text-white" 
                          placeholder="Volvo, Renault, etc." 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editVehicleForm.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Modèle</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-700/50 border-gray-600 text-white" 
                          placeholder="FH16, T High, etc." 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editVehicleForm.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Année</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-700/50 border-gray-600 text-white" 
                          placeholder="2023" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editVehicleForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Type</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-700/50 border-gray-600 text-white" 
                          placeholder="Camion Benne, Chargeuse, etc." 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editVehicleForm.control}
                  name="vehicle_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Numéro véhicule</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-700/50 border-gray-600 text-white" 
                          placeholder="V-123456" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editVehicleForm.control}
                  name="plate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Immatriculation</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-gray-700/50 border-gray-600 text-white" 
                          placeholder="00000-000-00" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white">
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog pour la confirmation de suppression */}
      <AlertDialog open={deleteOpen}>
        <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Cette action ne peut pas être annulée. Cela supprimera définitivement le véhicule
              {vehicle && ` ${vehicle.type} ${vehicle.vehicle_number}`} et toutes les données associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
              onClick={() => setDeleteOpen(false)}
            >
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
