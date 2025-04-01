
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ClientPaymentForm } from "./ClientPaymentForm";
import { ClientPaymentReceipt } from "./ClientPaymentReceipt";

interface ClientPaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: { id: string; name: string } | null;
}

export function ClientPaymentDetails({ 
  open, 
  onOpenChange, 
  client 
}: ClientPaymentDetailsProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  if (!client) return null;

  // Génération de données fictives pour le client sélectionné
  const payments = [
    {
      id: "P001",
      date: "2024-07-15",
      amount: 300000,
      method: "Virement",
      reference: "VIR-2024-076",
      status: "complété"
    },
    {
      id: "P002",
      date: "2024-06-30",
      amount: 300000,
      method: "Chèque",
      reference: "CHQ-2024-045",
      status: "complété"
    },
    {
      id: "P003",
      date: "2024-06-15",
      amount: 350000,
      method: "Espèces",
      reference: "ESP-2024-032",
      status: "complété"
    }
  ];

  const handleEditPayment = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentForm(true);
  };

  const handleDeletePayment = (paymentId: string) => {
    toast.success(`Le paiement ${paymentId} a été supprimé`);
    // Dans une implémentation réelle, cette fonction supprimerait le paiement de la base de données
  };

  const handleViewReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setShowReceipt(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              Détails des paiements - {client.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <Table>
              <TableHeader className="bg-gray-800/50">
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Référence</TableHead>
                  <TableHead className="text-gray-300">Méthode</TableHead>
                  <TableHead className="text-right text-gray-300">Montant</TableHead>
                  <TableHead className="text-center text-gray-300">Status</TableHead>
                  <TableHead className="text-center text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="border-gray-700">
                    <TableCell className="text-gray-300">{payment.date}</TableCell>
                    <TableCell className="text-gray-300">{payment.reference}</TableCell>
                    <TableCell className="text-gray-300">{payment.method}</TableCell>
                    <TableCell className="text-right text-green-400">
                      {payment.amount.toLocaleString('fr-FR')} DA
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewReceipt(payment)}
                          className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditPayment(payment)}
                          className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePayment(payment.id)}
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {showPaymentForm && (
        <ClientPaymentForm
          open={showPaymentForm}
          onOpenChange={setShowPaymentForm}
          paymentToEdit={selectedPayment}
          clientId={client.id}
        />
      )}

      {showReceipt && (
        <ClientPaymentReceipt
          open={showReceipt}
          onOpenChange={setShowReceipt}
          paymentData={{
            client: client.name,
            amount: selectedPayment.amount.toString(),
            paymentMethod: selectedPayment.method,
            paymentDate: new Date(selectedPayment.date),
            reference: selectedPayment.reference
          }}
        />
      )}
    </>
  );
}
