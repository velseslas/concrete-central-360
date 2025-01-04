import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, ChevronRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentForm } from "../PaymentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentPreview } from "./PaymentPreview";
import { toast } from "sonner";
import { PaymentStateFilters } from "./payment/PaymentStateFilters";
import { PaymentStateDialog } from "./payment/PaymentStateDialog";

const mockClients = [
  {
    id: "1",
    name: "Entreprise ABC",
    totalPaid: 15000,
    lastPayment: "2024-03-20",
    payments: [
      { 
        id: 1, 
        amount: 5000, 
        date: "2024-03-20", 
        reference: "PAY001",
        document: "Facture_PAY001.pdf"
      },
      { 
        id: 2, 
        amount: 5000, 
        date: "2024-03-15", 
        reference: "PAY002",
        document: "Facture_PAY002.pdf"
      },
      { 
        id: 3, 
        amount: 5000, 
        date: "2024-03-10", 
        reference: "PAY003",
        document: "Facture_PAY003.pdf"
      },
    ]
  },
  {
    id: "2",
    name: "SARL XYZ",
    totalPaid: 25000,
    lastPayment: "2024-03-19",
    payments: [
      { 
        id: 4, 
        amount: 10000, 
        date: "2024-03-19", 
        reference: "PAY004",
        document: "Facture_PAY004.pdf"
      },
      { 
        id: 5, 
        amount: 15000, 
        date: "2024-03-14", 
        reference: "PAY005",
        document: "Facture_PAY005.pdf"
      },
    ]
  }
];

export function PaymentWidget() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setShowPaymentDetails(true);
  };

  const handleDocumentClick = (document: string) => {
    setSelectedDocument(document);
    setShowDocumentPreview(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Paiements des Clients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                    <p className="text-sm text-white/80">
                      Dernier paiement: {client.lastPayment}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">
                      Total: {client.totalPaid.toLocaleString()} DA
                    </span>
                    <Button 
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => handleViewDetails(client)}
                    >
                      Détails
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Historique des paiements - {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead className="text-center">Document</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClient?.payments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.reference}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="text-right">
                      {payment.amount.toLocaleString()} DA
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDocumentClick(payment.document)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentPreview
        open={showDocumentPreview}
        onOpenChange={setShowDocumentPreview}
        selectedDocument={selectedDocument}
        selectedClient={selectedClient}
      />

      <PaymentForm 
        open={showPaymentForm} 
        onOpenChange={setShowPaymentForm}
        clientId={1}
      />
    </motion.div>
  );
}