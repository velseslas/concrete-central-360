import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ChevronRight, FileText, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PaymentForm } from "../PaymentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for demonstration
const mockClients = [
  {
    id: 1,
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
    id: 2,
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
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
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

  const handlePrint = () => {
    console.log("Impression du document:", selectedDocument);
    window.print();
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

      <Dialog open={showDocumentPreview} onOpenChange={setShowDocumentPreview}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px]">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-2xl font-bold">
              Aperçu - {selectedDocument}
            </DialogTitle>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-24 w-24 text-gray-400" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentForm 
        open={showPaymentForm} 
        onOpenChange={setShowPaymentForm}
        clientId={1}
      />
    </motion.div>
  );
}