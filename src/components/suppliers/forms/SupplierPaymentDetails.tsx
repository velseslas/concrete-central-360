
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Pencil, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { SupplierPaymentForm } from "./SupplierPaymentForm";
import { SupplierPaymentReceipt } from "./SupplierPaymentReceipt";

// Mock data for the payment history
const getPaymentHistory = (supplierId: string) => [
  {
    id: "P001",
    date: "2024-07-10",
    amount: 250000,
    method: "virement",
    reference: "VIR-2024-125",
    notes: "Paiement partiel",
    paymentDate: new Date("2024-07-10")
  },
  {
    id: "P002",
    date: "2024-06-15",
    amount: 300000,
    method: "cheque",
    reference: "CHQ-2024-089",
    notes: "Paiement facture Mai",
    paymentDate: new Date("2024-06-15")
  },
  {
    id: "P003",
    date: "2024-05-20",
    amount: 175000,
    method: "especes",
    reference: "ESP-2024-045",
    notes: "Avance sur commande",
    paymentDate: new Date("2024-05-20")
  }
];

interface SupplierPaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: {
    id: string;
    name: string;
  } | null;
}

export function SupplierPaymentDetails({ 
  open, 
  onOpenChange, 
  supplier 
}: SupplierPaymentDetailsProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  if (!supplier) return null;

  const paymentHistory = getPaymentHistory(supplier.id);

  const handleEdit = (payment: any) => {
    setPaymentToEdit({
      supplier: supplier.id,
      amount: payment.amount.toString(),
      paymentMethod: payment.method,
      paymentDate: payment.paymentDate,
      notes: payment.notes
    });
    setShowPaymentForm(true);
  };

  const handleDelete = (paymentId: string) => {
    toast.success("Paiement supprimé avec succès");
    // In a real implementation, you would make a database call to delete the payment
  };

  const handleViewReceipt = (payment: any) => {
    setSelectedPayment({
      supplier: supplier.name,
      amount: payment.amount.toString(),
      paymentMethod: payment.method,
      paymentDate: payment.paymentDate,
      notes: payment.notes
    });
    setShowReceipt(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Historique des paiements - {supplier.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <Table>
              <TableHeader className="bg-gray-800/50">
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Référence</TableHead>
                  <TableHead className="text-gray-300 text-right">Montant</TableHead>
                  <TableHead className="text-gray-300">Mode de paiement</TableHead>
                  <TableHead className="text-gray-300">Notes</TableHead>
                  <TableHead className="text-gray-300 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="text-gray-300">{payment.date}</TableCell>
                    <TableCell className="text-gray-300">{payment.reference}</TableCell>
                    <TableCell className="text-right text-green-400">
                      {payment.amount.toLocaleString('fr-FR')} DA
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {payment.method === "virement" && "Virement bancaire"}
                      {payment.method === "cheque" && "Chèque"}
                      {payment.method === "especes" && "Espèces"}
                      {payment.method === "carte" && "Carte bancaire"}
                    </TableCell>
                    <TableCell className="text-gray-300">{payment.notes}</TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20"
                          onClick={() => handleViewReceipt(payment)}
                          title="Voir le reçu"
                        >
                          <Receipt className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                          onClick={() => handleEdit(payment)}
                          title="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          onClick={() => handleDelete(payment.id)}
                          title="Supprimer"
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
        <SupplierPaymentForm
          open={showPaymentForm}
          onOpenChange={setShowPaymentForm}
          paymentToEdit={paymentToEdit}
        />
      )}

      {showReceipt && selectedPayment && (
        <SupplierPaymentReceipt
          open={showReceipt}
          onOpenChange={setShowReceipt}
          paymentData={selectedPayment}
        />
      )}
    </>
  );
}
