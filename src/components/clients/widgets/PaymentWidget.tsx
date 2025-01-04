import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, ChevronRight, FileText, Filter, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentForm } from "../PaymentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentPreview } from "./PaymentPreview";
import { toast } from "sonner";

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

const paymentMethods = [
  { id: "cash", label: "Espèces" },
  { id: "check", label: "Chèque" },
  { id: "transfer", label: "Virement" }
];

export function PaymentWidget() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // États pour la génération du rapport
  const [reportClient, setReportClient] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showReport, setShowReport] = useState(false);

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setShowPaymentDetails(true);
  };

  const handleDocumentClick = (document: string) => {
    setSelectedDocument(document);
    setShowDocumentPreview(true);
  };

  const handleGenerateReport = () => {
    if (!reportClient || !startDate || !endDate || !paymentMethod) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    console.log("Generating report with filters:", {
      client: reportClient,
      startDate,
      endDate,
      paymentMethod,
    });
    
    setShowReport(true);
    toast.success("État de paiement généré avec succès");
  };

  const handlePrint = () => {
    window.print();
    console.log("Printing payment state");
  };

  // Données d'exemple pour le rapport
  const reportData = [
    {
      date: "2024-03-20",
      reference: "PAY001",
      amount: 150000,
      method: "Chèque",
      status: "Payé"
    },
    {
      date: "2024-03-21",
      reference: "PAY002",
      amount: 75000,
      method: "Virement",
      status: "Payé"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Section État des Paiements */}
      <Card className="mb-6 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            État des Paiements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filtres</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={reportClient} onValueChange={setReportClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Date début"
              />

              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Date fin"
              />

              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Mode de paiement" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={handleGenerateReport} className="bg-blue-500 hover:bg-blue-600">
                Générer l'état
              </Button>
              {showReport && (
                <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Imprimer
                </Button>
              )}
            </div>

            {showReport && (
              <div className="mt-6 print:mt-0">
                <div className="mb-6 print:mb-4">
                  <h2 className="text-xl font-bold mb-2">État des Paiements</h2>
                  <p className="text-sm text-gray-600">
                    Période: du {startDate} au {endDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Client: {mockClients.find(c => c.id.toString() === reportClient)?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Mode de paiement: {paymentMethods.find(m => m.id === paymentMethod)?.label}
                  </p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.reference}</TableCell>
                        <TableCell>{payment.amount.toLocaleString()} DA</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold">
                      <TableCell colSpan={2} className="text-right">Total:</TableCell>
                      <TableCell>
                        {reportData.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()} DA
                      </TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section Paiements des Clients */}
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