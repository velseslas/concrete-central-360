import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { DeliveryBasicInfo } from "./delivery/DeliveryBasicInfo";
import { DeliverySupplierInfo } from "./delivery/DeliverySupplierInfo";
import { DeliveryQuantityInfo } from "./delivery/DeliveryQuantityInfo";

const deliverySchema = z.object({
  category: z.string().min(1, "La catégorie est requise"),
  supplier: z.string().min(1, "Le fournisseur est requis"),
  producer: z.string().min(1, "Le producteur est requis"),
  product: z.string().min(1, "Le produit est requis"),
  date: z.string().min(1, "La date est requise"),
  vehicleNumber: z.string().min(1, "Le matricule du camion est requis"),
  deliveryNoteNumber: z.string().min(1, "Le numéro de bon de livraison est requis"),
  quantity: z.string().min(1, "La quantité est requise"),
  unit: z.string().min(1, "L'unité est requise"),
});

type DeliveryFormValues = z.infer<typeof deliverySchema>;

interface DeliveryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deliveryToEdit?: DeliveryFormValues;
}

export function DeliveryForm({ open, onOpenChange, deliveryToEdit }: DeliveryFormProps) {
  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliverySchema),
    defaultValues: deliveryToEdit || {
      category: "",
      supplier: "",
      producer: "",
      product: "",
      date: "",
      vehicleNumber: "",
      deliveryNoteNumber: "",
      quantity: "",
      unit: "",
    },
  });

  const onSubmit = (data: DeliveryFormValues) => {
    console.log("Delivery data:", data);
    toast.success(deliveryToEdit ? "Livraison modifiée avec succès" : "Livraison ajoutée avec succès");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {deliveryToEdit ? "Modifier la livraison" : "Nouvelle livraison"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <DeliveryBasicInfo control={form.control} />
              <DeliverySupplierInfo control={form.control} />
              <DeliveryQuantityInfo control={form.control} />
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="hover:bg-gray-100/10"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {deliveryToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}