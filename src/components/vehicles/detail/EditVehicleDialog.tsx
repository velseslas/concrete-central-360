
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Vehicle } from "@/types/vehicle";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle | null;
}

export const EditVehicleDialog = ({
  open,
  onOpenChange,
  vehicle
}: EditVehicleDialogProps) => {
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

  const handleEditSubmit = (data: any) => {
    console.log("Modification du véhicule:", data);
    toast.success("Véhicule modifié avec succès");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};
