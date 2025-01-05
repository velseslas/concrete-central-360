import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, CreditCard, ChevronRight, FileText, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentForm } from "./PaymentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentPreview } from "@/components/clients/widgets/PaymentPreview";
import { mockClients } from "./payment/mockData";
import { toast } from "sonner";

const mockPayments = [
  {
    id: 1,
    supplier: "SARL CIMENT PLUS",
    amount: 120000,
    paymentMethod: "Virement bancaire",
    paymentDate: "2024-03-20",
    reference: "VIR2024001"
  },
  {
    id: 2,
    supplier: "EURL AGREGATS",
    amount: 40000,
    paymentMethod: "Chèque",
    paymentDate: "2024-03-21",
    reference: "CHQ2024001"
  }
];

export function PaymentWidget() {
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState<any>(null);

  const handleEdit = (payment: any) => {
    setPaymentToEdit(payment);
    setShowNewPaymentForm(true);
  };

  const handleDelete = (paymentId: number) => {
    console.log("Deleting payment:", paymentId);
    toast.success("Paiement supprimé");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Paiements</CardTitle>
        <Button onClick={() => setShowNewPaymentForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau paiement
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fournisseur</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Mode de paiement</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.supplier}</TableCell>
                <TableCell>{payment.amount.toLocaleString()} DA</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>{payment.paymentDate}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(payment)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(payment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaymentForm
          open={showNewPaymentForm}
          onOpenChange={setShowNewPaymentForm}
          paymentToEdit={paymentToEdit}
        />
      </CardContent>
    </Card>
  );
}
