import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, CreditCard, ChevronRight, FileText, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentForm } from "./PaymentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentPreview } from "./payment/PaymentPreview";
import { mockClients } from "./payment/mockData";
import { toast } from "sonner";

const mockPayments = [
  {
    id: "1",
    client: "Client A",
    amount: 150000,
    date: "2024-03-20",
    method: "Virement",
    document: "PAY001"
  },
  {
    id: "2",
    client: "Client B",
    amount: 225000,
    date: "2024-03-21",
    method: "Chèque",
    document: "PAY002"
  }
];

export function PaymentWidget() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [paymentToEdit, setPaymentToEdit] = useState(null);

  const handlePreview = (document: string, clientId: string) => {
    setSelectedDocument(document);
    const client = mockClients.find(c => c.id === clientId);
    setSelectedClient(client);
    setShowPreview(true);
  };

  const handleEdit = (payment: any) => {
    setPaymentToEdit(payment);
    setShowPaymentForm(true);
  };

  const handleDelete = (paymentId: string) => {
    console.log("Suppression du paiement:", paymentId);
    toast.success("Paiement supprimé");
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-white">Paiements</CardTitle>
          </div>
          <Button
            onClick={() => setShowPaymentForm(true)}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau paiement
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-hidden border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 bg-gray-800/50">
                <TableHead className="text-gray-300">Client</TableHead>
                <TableHead className="text-gray-300">Montant</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Mode</TableHead>
                <TableHead className="text-gray-300">Document</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => (
                <TableRow key={payment.id} className="border-gray-700 bg-gray-800/30 hover:bg-gray-700/50 transition-colors duration-200">
                  <TableCell className="text-gray-300">{payment.client}</TableCell>
                  <TableCell className="text-gray-300">{payment.amount.toLocaleString()} DA</TableCell>
                  <TableCell className="text-gray-300">{payment.date}</TableCell>
                  <TableCell className="text-gray-300">{payment.method}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => handlePreview(payment.document, payment.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {payment.document}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => handleEdit(payment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-400 hover:text-rose-300"
                      onClick={() => handleDelete(payment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <PaymentForm
        open={showPaymentForm}
        onOpenChange={setShowPaymentForm}
        paymentToEdit={paymentToEdit}
      />

      <PaymentPreview
        open={showPreview}
        onOpenChange={setShowPreview}
        selectedDocument={selectedDocument}
        selectedClient={selectedClient}
      />
    </Card>
  );
}