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
          <style>
            {`
              @media print {
                .no-print {
                  display: none !important;
                }
                [role="dialog"] button[type="button"] {
                  display: none !important;
                }
                @page {
                  size: 4in auto;
                  margin: 0;
                }
                .print-preview {
                  width: 384px !important;
                  margin: 0 auto;
                  padding: 1rem;
                }
              }
            `}
          </style>
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-2xl font-bold">
              Aperçu - {selectedDocument}
            </DialogTitle>
            <Button onClick={handlePrint} variant="outline" className="no-print mr-8">
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </DialogHeader>
          <div className="flex justify-center overflow-auto py-4">
            <div className="print-preview w-[384px] min-h-[600px] bg-white rounded-lg shadow-lg p-4 space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-bold text-center">Bon de paiement</h3>
                <p className="text-sm text-gray-600 text-center">Ref: {selectedDocument}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-semibold">Client:</span> {selectedClient?.name}</p>
                <p className="text-sm"><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
                <p className="text-sm"><span className="font-semibold">Montant:</span> {selectedClient?.totalPaid.toLocaleString()} DA</p>
              </div>
              <div className="pt-8 space-y-8">
                <div className="text-center">
                  <p className="text-sm font-semibold mb-12">Signature du client</p>
                  <div className="border-t border-gray-300 w-32 mx-auto"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold mb-12">Signature de l'entreprise</p>
                  <div className="border-t border-gray-300 w-32 mx-auto"></div>
                </div>
              </div>
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
