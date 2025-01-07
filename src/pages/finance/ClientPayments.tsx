import { motion } from "framer-motion";
import { PaymentState } from "@/components/clients/payment-form/PaymentState";
import { ClientPaymentList } from "@/components/clients/widgets/payment/ClientPaymentList";
import { PaymentDetails } from "@/components/clients/widgets/payment/PaymentDetails";
import { useState } from "react";

// Mock data - à remplacer par des données réelles
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

const mockClients = [
  {
    id: "1",
    name: "Client A",
    totalPaid: 450000,
    lastPayment: "2024-03-22",
    payments: [
      {
        id: 1,
        amount: 150000,
        date: "2024-03-20",
        reference: "PAY001",
        document: "doc1.pdf",
        paymentMethod: "especes",
        projectId: "P1"
      },
      {
        id: 3,
        amount: 300000,
        date: "2024-03-22",
        reference: "PAY003",
        document: "doc3.pdf",
        paymentMethod: "virement",
        projectId: "P3"
      }
    ]
  },
  {
    id: "2", 
    name: "Client B",
    totalPaid: 200000,
    lastPayment: "2024-03-21",
    payments: [
      {
        id: 2,
        amount: 200000,
        date: "2024-03-21",
        reference: "PAY002",
        document: "doc2.pdf",
        paymentMethod: "cheque",
        projectId: "P2"
      }
    ]
  }
];

export default function ClientPayments() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const handleViewDetails = (client: any) => {
    console.log("Viewing details for client:", client.name);
    setSelectedClient(client);
    setShowPaymentDetails(true);
  };

  const handleDocumentClick = (document: string) => {
    console.log("Opening document:", document);
    // Implémenter la logique d'ouverture du document
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-2xl font-bold text-white">
          Paiements Clients
        </h1>

        <div className="grid grid-cols-1 gap-8">
          <PaymentState payments={mockPayments} />
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Historique des Paiements par Client
            </h2>
            <ClientPaymentList 
              clients={mockClients}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>

        <PaymentDetails
          open={showPaymentDetails}
          onOpenChange={setShowPaymentDetails}
          selectedClient={selectedClient}
          onDocumentClick={handleDocumentClick}
        />
      </motion.div>
    </div>
  );
}