import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentForm } from "../PaymentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentPreview } from "./PaymentPreview";
import { PaymentState } from "../payment-form/PaymentState";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        document: "Facture_PAY001.pdf",
        paymentMethod: "virement",
        projectId: "PRJ001"
      },
      { 
        id: 2, 
        amount: 5000, 
        date: "2024-03-15", 
        reference: "PAY002", 
        document: "Facture_PAY002.pdf",
        paymentMethod: "cheque",
        projectId: "PRJ002"
      },
      { 
        id: 3, 
        amount: 5000, 
        date: "2024-03-10", 
        reference: "PAY003", 
        document: "Facture_PAY003.pdf",
        paymentMethod: "especes",
        projectId: "PRJ001"
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
        document: "Facture_PAY004.pdf",
        paymentMethod: "virement",
        projectId: "PRJ003"
      },
      { 
        id: 5, 
        amount: 15000, 
        date: "2024-03-14", 
        reference: "PAY005", 
        document: "Facture_PAY005.pdf",
        paymentMethod: "cheque",
        projectId: "PRJ003"
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

  // Exemple de données de paiement pour l'état
  const mockPayments = [
    {
      id: 1,
      date: "2024-03-20",
      reference: "PAY001",
      amount: 150000,
      method: "especes",
      clientName: "Client A",
      projectName: "Projet 1"
    },
    {
      id: 2,
      date: "2024-03-21",
      reference: "PAY002",
      amount: 200000,
      method: "cheque",
      clientName: "Client B",
      projectName: "Projet 2"
    },
    {
      id: 3,
      date: "2024-03-22",
      reference: "PAY003",
      amount: 300000,
      method: "virement",
      clientName: "Client A",
      projectName: "Projet 3"
    }
  ];

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setShowPaymentDetails(true);
  };

  const handleDocumentClick = (document: string) => {
    setSelectedDocument(document);
    setShowDocumentPreview(true);
  };

  const handleNewPayment = () => {
    console.log("Opening payment form");
    setShowPaymentForm(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group space-y-6"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-4">
              <DollarSign className="h-6 w-6 text-blue-400 ml-2" />
              Liste des Paiements
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Button 
                onClick={handleNewPayment}
                variant="default"
                className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                Nouveau Paiement
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                    <p className="text-sm text-gray-400">
                      Dernier paiement: {client.lastPayment}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-400">
                      {client.totalPaid.toLocaleString()} DA
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(client)}
                      className="text-gray-400 hover:text-white"
                    >
                      Voir détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PaymentState payments={mockPayments} />

      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Historique des paiements - {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Référence</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-right text-gray-400">Montant</TableHead>
                  <TableHead className="text-center text-gray-400">Document</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClient?.payments.map((payment: any) => (
                  <TableRow key={payment.id} className="border-gray-800">
                    <TableCell className="text-gray-300">{payment.reference}</TableCell>
                    <TableCell className="text-gray-300">{payment.date}</TableCell>
                    <TableCell className="text-right text-gray-300">
                      {payment.amount.toLocaleString()} DA
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDocumentClick(payment.document)}
                        className="text-gray-300 hover:text-white hover:bg-gray-800"
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
