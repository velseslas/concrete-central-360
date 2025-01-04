import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PaymentReceiptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: {
    clientId: string;
    projectId: string;
    amount: string;
    paymentDate: string;
    reference: string;
  };
  clientName: string;
  projectName: string;
}

export function PaymentReceipt({
  open,
  onOpenChange,
  paymentData,
  clientName,
  projectName,
}: PaymentReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = format(new Date(paymentData.paymentDate), "d MMMM yyyy", { locale: fr });
  const formattedAmount = new Intl.NumberFormat("fr-FR").format(Number(paymentData.amount));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Bon de Paiement</DialogTitle>
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-8 p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">BON DE PAIEMENT</h1>
            <p className="text-gray-500">N° {paymentData.reference}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Client</h3>
              <p>{clientName}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold mb-2">Date</h3>
              <p>{formattedDate}</p>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Chantier</h3>
                  <p>{projectName}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold mb-1">Mode de paiement</h3>
                  <p>Espèces</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Montant total</span>
                  <span className="text-xl font-bold">{formattedAmount} DA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-semibold mb-4">Signature du client</h3>
              <div className="border-b border-dashed w-full h-16"></div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Signature de l'agent</h3>
              <div className="border-b border-dashed w-full h-16"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}