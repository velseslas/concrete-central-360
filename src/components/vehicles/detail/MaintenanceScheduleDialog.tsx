
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface MaintenanceScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MaintenanceScheduleDialog = ({
  open,
  onOpenChange
}: MaintenanceScheduleDialogProps) => {
  const maintenanceForm = useForm({
    defaultValues: {
      date: "",
      description: "",
      technician: ""
    }
  });

  const handleMaintenanceSubmit = (data: any) => {
    console.log("Planification de maintenance:", data);
    toast.success("Maintenance planifiée avec succès");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};
