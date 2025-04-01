
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, CreditCard, FileText, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ClientPaymentForm } from "@/components/clients/forms/ClientPaymentForm";
import { ClientPaymentDetails } from "@/components/clients/forms/ClientPaymentDetails";
import { mockClientPayments } from "@/components/clients/data/clientPaymentsData";

const paymentHistory = [
  {
    id: "P001",
    date: "2024-07-15",
    client: "ENTREPRISE ABC",
    amount: 300000,
    method: "Virement",
    reference: "VIR-2024-076",
    invoiceReference: "FAC-2024-011"
  },
  {
    id: "P002",
    date: "2024-07-08",
    client: "SARL XYZ CONSTRUCTION",
    amount: 225000,
    method: "Chèque",
    reference: "CHQ-2024-053",
    invoiceReference: "FAC-2024-022"
  },
  {
    id: "P003",
    date: "2024-06-30",
    client: "ENTREPRISE ABC",
    amount: 300000,
    method: "Chèque",
    reference: "CHQ-2024-045",
    invoiceReference: "FAC-2024-011"
  },
  {
    id: "P004",
    date: "2024-06-30",
    client: "ETS HABITAT MODERNE",
    amount: 350000,
    method: "Espèces",
    reference: "ESP-2024-032",
    invoiceReference: "FAC-2024-033"
  },
  {
    id: "P005",
    date: "2024-06-20",
    client: "SARL XYZ CONSTRUCTION",
    amount: 200000,
    method: "Virement",
    reference: "VIR-2024-068",
    invoiceReference: "FAC-2024-022"
  }
];

export default function ClientPayments() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientForDetails, setClientForDetails] = useState<{id: string, name: string} | null>(null);

  const handleNewPayment = (clientId?: string, invoiceId?: string) => {
    setSelectedClientId(clientId || null);
    setSelectedInvoiceId(invoiceId || null);
    setShowPaymentForm(true);
  };

  const handleExport = () => {
    toast.success("Export des paiements en cours...");
  };

  const handleFilter = () => {
    toast.info("Filtres à venir...");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "payé":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20">Payé</Badge>;
      case "partiel":
        return <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500/20">Partiel</Badge>;
      case "impayé":
        return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/20">Impayé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalDue = mockClientPayments.reduce((acc, payment) => acc + payment.remainingAmount, 0);
  const urgentDue = mockClientPayments.filter(payment => {
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && payment.remainingAmount > 0;
  }).reduce((acc, payment) => acc + payment.remainingAmount, 0);

  const handleRowClick = (payment: any) => {
    setClientForDetails({
      id: payment.id,
      name: payment.client
    });
    setShowPaymentDetails(true);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">Paiements Clients</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 text-gray-200"
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button
            variant="outline"
            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleNewPayment()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Paiement
          </Button>
        </div>
      </motion.div>

      <ClientPaymentForm
        open={showPaymentForm}
        onOpenChange={setShowPaymentForm}
        clientId={selectedClientId || undefined}
      />

      <ClientPaymentDetails
        open={showPaymentDetails}
        onOpenChange={setShowPaymentDetails}
        client={clientForDetails}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-400" />
                Total à recevoir
              </CardTitle>
              <CardDescription className="text-gray-400">
                Montant total restant à recevoir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{totalDue.toLocaleString('fr-FR')} DA</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-400" />
                Paiements urgents
              </CardTitle>
              <CardDescription className="text-gray-400">
                Échéances sous 7 jours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-400">{urgentDue.toLocaleString('fr-FR')} DA</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Clients
              </CardTitle>
              <CardDescription className="text-gray-400">
                Nombre de clients avec factures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">{new Set(mockClientPayments.map(p => p.client)).size}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="bg-gray-800/50 border border-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700/50">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gray-700/50">Historique des paiements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Factures clients</CardTitle>
                <CardDescription className="text-gray-400">
                  Gestion des factures et des paiements à recevoir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-gray-800/50">
                    <TableRow className="hover:bg-gray-700/50 border-gray-700">
                      <TableHead className="text-gray-300">Client</TableHead>
                      <TableHead className="text-gray-300 text-right">Montant total</TableHead>
                      <TableHead className="text-gray-300 text-right">Déjà payé</TableHead>
                      <TableHead className="text-gray-300 text-right">Reste à payer</TableHead>
                      <TableHead className="text-gray-300 text-center">Statut</TableHead>
                      <TableHead className="text-gray-300 text-right">Échéance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClientPayments.map((payment) => (
                      <TableRow 
                        key={payment.id} 
                        className="hover:bg-gray-700/50 border-gray-700 cursor-pointer"
                        onClick={() => handleRowClick(payment)}
                      >
                        <TableCell className="font-medium text-gray-200">{payment.client}</TableCell>
                        <TableCell className="text-right text-gray-300">{payment.totalAmount.toLocaleString('fr-FR')} DA</TableCell>
                        <TableCell className="text-right text-green-400">{payment.paidAmount.toLocaleString('fr-FR')} DA</TableCell>
                        <TableCell className="text-right text-amber-400">{payment.remainingAmount.toLocaleString('fr-FR')} DA</TableCell>
                        <TableCell className="text-center">{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right text-gray-300">{payment.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Historique des paiements</CardTitle>
                <CardDescription className="text-gray-400">
                  Tous les paiements reçus des clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-gray-800/50">
                    <TableRow className="hover:bg-gray-700/50 border-gray-700">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Client</TableHead>
                      <TableHead className="text-gray-300">Référence facture</TableHead>
                      <TableHead className="text-gray-300">Référence paiement</TableHead>
                      <TableHead className="text-gray-300">Mode</TableHead>
                      <TableHead className="text-gray-300 text-right">Montant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow 
                        key={payment.id} 
                        className="hover:bg-gray-700/50 border-gray-700 cursor-pointer"
                        onClick={() => {
                          setClientForDetails({
                            id: mockClientPayments.find(c => c.client === payment.client)?.id || "",
                            name: payment.client
                          });
                          setShowPaymentDetails(true);
                        }}
                      >
                        <TableCell className="text-gray-300">{payment.date}</TableCell>
                        <TableCell className="font-medium text-gray-200">{payment.client}</TableCell>
                        <TableCell className="text-gray-300">{payment.invoiceReference}</TableCell>
                        <TableCell className="text-gray-300">{payment.reference}</TableCell>
                        <TableCell className="text-gray-300">{payment.method}</TableCell>
                        <TableCell className="text-right text-green-400">{payment.amount.toLocaleString('fr-FR')} DA</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
