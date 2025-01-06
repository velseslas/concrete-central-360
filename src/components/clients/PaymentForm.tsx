import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PaymentFormFields } from "./payment-form/PaymentFormFields";
import { PaymentFormValues, paymentSchema } from "./payment-form/types";
import { mockClients, mockProjects } from "./payment-form/mockData";

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
  paymentToEdit?: PaymentFormValues;
}

export function PaymentForm({ open, onOpenChange, clientId, paymentToEdit }: PaymentFormProps) {
  console.log("Opening form with payment data:", paymentToEdit);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      clientId: paymentToEdit?.clientId || clientId.toString(),
      projectId: paymentToEdit?.projectId || "",
      amount: paymentToEdit?.amount ? Number(paymentToEdit.amount).toLocaleString() : "",
      paymentMethod: paymentToEdit?.paymentMethod || "",
      paymentDate: paymentToEdit?.paymentDate || "",
      reference: paymentToEdit?.reference || "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Document de paiement:", file);
      toast.success("Document téléchargé avec succès");
    }
  };

  const onSubmit = (data: PaymentFormValues) => {
    // Convertir le montant formaté en nombre avant l'envoi
    const formattedData = {
      ...data,
      amount: data.amount ? parseFloat(data.amount.replace(/\s/g, '').replace(/,/g, '')) : 0,
    };
    console.log("Payment data:", formattedData);
    toast.success(paymentToEdit ? "Paiement modifié" : "Paiement enregistré");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {paymentToEdit ? "Modifier le paiement" : "Nouveau paiement"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PaymentFormFields
              form={form}
              mockClients={mockClients}
              mockProjects={mockProjects}
              handleFileUpload={handleFileUpload}
            />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {paymentToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}