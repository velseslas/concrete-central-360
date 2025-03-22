import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, CreditCard, FileText, Building2 } from "lucide-react";
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
import { SupplierPaymentForm } from "@/components/suppliers/forms/SupplierPaymentForm";

const mockSupplierPayments = [
  {
    id: "SP001",
    supplier: "SARL CIMENT PLUS",
    totalAmount: 850000,
    paidAmount: 500000,
    remainingAmount: 350000,
    lastPaymentDate: "2024-07-10",
    dueDate: "2024-07-30",
    status: "partiel",
    invoiceNumber: "FAC-2024-001",
    category: "Matériaux"
  },
  {
    id: "SP002",
    supplier: "EURL AGREGATS",
    totalAmount: 325000,
    paidAmount: 325000,
    remainingAmount: 0,
    lastPaymentDate: "2024-07-05",
    dueDate: "2024-07-15",
    status: "payé",
    invoiceNumber: "FAC-2024-002",
    category: "Matériaux"
  },
  {
    id: "SP003",
    supplier: "ETS COMPTOIR METALLIQUE",
    totalAmount: 1200000,
    paidAmount: 600000,
    remainingAmount: 600000,
    lastPaymentDate: "2024-06-28",
    dueDate: "2024-07-20",
    status: "partiel",
    invoiceNumber: "FAC-2024-003",
    category: "Équipement"
  },
  {
    id: "SP004",
    supplier: "SPA EQUIPEMENTS BTP",
    totalAmount: 430000,
    paidAmount: 0,
    remainingAmount: 430000,
    lastPaymentDate: "-",
    dueDate: "2024-08-05",
    status: "impayé",
    invoiceNumber: "FAC-2024-004",
    category: "Équipement"
  },
  {
    id: "SP005",
    supplier: "SARL LOCATION ENGINS",
    totalAmount: 750000,
    paidAmount: 250000,
    remainingAmount: 500000,
    lastPaymentDate: "2024-07-02",
    dueDate: "2024-07-25",
    status: "partiel",
    invoiceNumber: "FAC-2024-005",
    category: "Location"
  }
];

const paymentHistory = [
  {
    id: "P001",
    date: "2024-07-10",
    supplier: "SARL CIMENT PLUS",
    amount: 250000,
    method: "Virement",
    reference: "VIR-2024-125",
    invoiceReference: "FAC-2024-001"
  },
  {
    id: "P002",
    date: "2024-07-05",
    supplier: "EURL AGREGATS",
    amount: 175000,
    method: "Chèque",
    reference: "CHQ-2024-089",
    invoiceReference: "FAC-2024-002"
  },
  {
    id: "P003",
    date: "2024-07-02",
    supplier: "SARL LOCATION ENGINS",
    amount: 250000,
    method: "Espèces",
    reference: "ESP-2024-045",
    invoiceReference: "FAC-2024-005"
  },
  {
    id: "P004",
    date: "2024-06-28",
    supplier: "ETS COMPTOIR METALLIQUE",
    amount: 600000,
    method: "Virement",
    reference: "VIR-2024-122",
    invoiceReference: "FAC-2024-003"
  },
  {
    id: "P005",
    date: "2024-06-20",
    supplier: "EURL AGREGATS",
    amount: 150000,
    method: "Chèque",
    reference: "CHQ-2024-078",
    invoiceReference: "FAC-2024-002"
  }
];

export default function SupplierPayments() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);

  const handleNewPayment = (supplierId?: string, invoiceId?: string) => {
    setSelectedSupplierId(supplierId || null);
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

  const totalDue = mockSupplierPayments.reduce((acc, payment) => acc + payment.remainingAmount, 0);
  const urgentDue = mockSupplierPayments.filter(payment => {
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && payment.remainingAmount > 0;
  }).reduce((acc, payment) => acc + payment.remainingAmount, 0);

  const handleRowClick = (supplierId: string) => {
    setSelectedSupplier(supplierId === selectedSupplier ? null : supplierId);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">Paiements Fournisseurs</h1>
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

      <SupplierPaymentForm
        open={showPaymentForm}
        onOpenChange={setShowPaymentForm}
        supplierId={selectedSupplierId || undefined}
        invoiceId={selectedInvoiceId || undefined}
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
                <CreditCard className="h-5 w-5 text-blue-400" />
                Total à payer
              </CardTitle>
              <CardDescription className="text-gray-400">
                Montant total restant à payer
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
                <Building2 className="h-5 w-5 text-purple-400" />
                Fournisseurs
              </CardTitle>
              <CardDescription className="text-gray-400">
                Nombre de fournisseurs avec factures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">{new Set(mockSupplierPayments.map(p => p.supplier)).size}</p>
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
                <CardTitle className="text-xl text-white">Factures fournisseurs</CardTitle>
                <CardDescription className="text-gray-400">
                  Gestion des factures et des paiements à effectuer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-gray-800/50">
                    <TableRow className="hover:bg-gray-700/50 border-gray-700">
                      <TableHead className="text-gray-300">Fournisseur</TableHead>
                      <TableHead className="text-gray-300">N° Facture</TableHead>
                      <TableHead className="text-gray-300 text-right">Montant total</TableHead>
                      <TableHead className="text-gray-300 text-right">Déjà payé</TableHead>
                      <TableHead className="text-gray-300 text-right">Reste à payer</TableHead>
                      <TableHead className="text-gray-300 text-center">Statut</TableHead>
                      <TableHead className="text-gray-300 text-right">Échéance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSupplierPayments.map((payment) => (
                      <TableRow 
                        key={payment.id} 
                        className={`hover:bg-gray-700/50 border-gray-700 cursor-pointer ${selectedSupplier === payment.id ? 'bg-gray-700/70' : ''}`}
                        onClick={() => handleRowClick(payment.id)}
                      >
                        <TableCell className="font-medium text-gray-200">{payment.supplier}</TableCell>
                        <TableCell className="text-gray-300">{payment.invoiceNumber}</TableCell>
                        <TableCell className="text-right text-gray-300">{payment.totalAmount.toLocaleString('fr-FR')} DA</TableCell>
                        <TableCell className="text-right text-green-400">{payment.paidAmount.toLocaleString('fr-FR')} DA</TableCell>
                        <TableCell className="text-right text-amber-400">{payment.remainingAmount.toLocaleString('fr-FR')} DA</TableCell>
                        <TableCell className="text-center">{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right text-gray-300">{payment.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {selectedSupplier && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                  >
                    <h3 className="text-lg font-medium text-white mb-2">
                      Historique des paiements - {mockSupplierPayments.find(p => p.id === selectedSupplier)?.supplier}
                    </h3>
                    <Table>
                      <TableHeader className="bg-gray-700/50">
                        <TableRow className="hover:bg-gray-600/50 border-gray-600">
                          <TableHead className="text-gray-300">Date</TableHead>
                          <TableHead className="text-gray-300">Référence</TableHead>
                          <TableHead className="text-gray-300 text-right">Montant</TableHead>
                          <TableHead className="text-gray-300">Mode</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paymentHistory
                          .filter(p => p.invoiceReference === mockSupplierPayments.find(s => s.id === selectedSupplier)?.invoiceNumber)
                          .map(payment => (
                            <TableRow key={payment.id} className="hover:bg-gray-600/50 border-gray-600">
                              <TableCell className="text-gray-300">{payment.date}</TableCell>
                              <TableCell className="text-gray-300">{payment.reference}</TableCell>
                              <TableCell className="text-right text-green-400">{payment.amount.toLocaleString('fr-FR')} DA</TableCell>
                              <TableCell className="text-gray-300">{payment.method}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <div className="flex justify-end mt-4">
                      <Button 
                        onClick={() => handleNewPayment(
                          (mockSupplierPayments.find(p => p.id === selectedSupplier)?.id || "1"), 
                          mockSupplierPayments.find(p => p.id === selectedSupplier)?.invoiceNumber
                        )}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un paiement
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Historique des paiements</CardTitle>
                <CardDescription className="text-gray-400">
                  Tous les paiements effectués aux fournisseurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-gray-800/50">
                    <TableRow className="hover:bg-gray-700/50 border-gray-700">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Fournisseur</TableHead>
                      <TableHead className="text-gray-300">Référence facture</TableHead>
                      <TableHead className="text-gray-300">Référence paiement</TableHead>
                      <TableHead className="text-gray-300">Mode</TableHead>
                      <TableHead className="text-gray-300 text-right">Montant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id} className="hover:bg-gray-700/50 border-gray-700">
                        <TableCell className="text-gray-300">{payment.date}</TableCell>
                        <TableCell className="font-medium text-gray-200">{payment.supplier}</TableCell>
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

