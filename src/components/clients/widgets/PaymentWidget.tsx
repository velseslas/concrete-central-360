import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentForm } from "../PaymentForm";
import { PaymentPreview } from "./payment/PaymentPreview";
import { PaymentState } from "../payment-form/PaymentState";
import { Button } from "@/components/ui/button";
import { ClientPaymentList } from "./payment/ClientPaymentList";
import { PaymentDetails } from "./payment/PaymentDetails";
import { PaymentStats } from "./payment/PaymentStats";
import { PaymentExport } from "./payment/PaymentExport";

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
    console.log("Opening details for client:", client);
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
      className="space-y-6"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-4">
              <DollarSign className="h-6 w-6 text-blue-400 ml-2" />
              Gestion des Paiements
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Button 
                onClick={handleNewPayment}
                variant="outline"
                className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors relative z-10"
              >
                Nouveau Paiement
              </Button>
              <PaymentExport />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <PaymentStats />
          
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-lg shadow-xl border border-gray-700/50 backdrop-blur-xl">
            <ClientPaymentList 
              clients={mockClients}
              onViewDetails={handleViewDetails}
            />
          </div>
        </CardContent>
      </Card>

      <PaymentState payments={mockPayments} />

      {showPaymentDetails && (
        <PaymentDetails
          open={showPaymentDetails}
          onOpenChange={setShowPaymentDetails}
          selectedClient={selectedClient}
          onDocumentClick={handleDocumentClick}
        />
      )}

      {showDocumentPreview && (
        <PaymentPreview
          open={showDocumentPreview}
          onOpenChange={setShowDocumentPreview}
          selectedDocument={selectedDocument}
          selectedClient={selectedClient}
        />
      )}

      {showPaymentForm && (
        <PaymentForm 
          open={showPaymentForm} 
          onOpenChange={setShowPaymentForm}
          clientId={1}
        />
      )}
    </motion.div>
  );
}
