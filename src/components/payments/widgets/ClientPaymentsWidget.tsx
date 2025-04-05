
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Eye, Plus, FileText, Search, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for client payments classified by project
const mockPayments = [
  {
    id: "1",
    clientId: "C001",
    client: "Entreprise ABC",
    project: "Chantier Résidentiel",
    totalAmount: 900000,
    paidAmount: 600000,
    remainingAmount: 300000,
    dueDate: "2024-07-25",
    status: "partiel",
    transactions: [
      { id: "T001", amount: 300000, date: "2024-05-15", method: "Virement", reference: "VIR-2024-001", receiptId: "R001" },
      { id: "T002", amount: 300000, date: "2024-06-15", method: "Chèque", reference: "CHQ-2024-001", receiptId: "R002" }
    ]
  },
  {
    id: "2",
    clientId: "C002",
    client: "SARL XYZ Construction",
    project: "Tour de bureaux",
    totalAmount: 1200000,
    paidAmount: 400000,
    remainingAmount: 800000,
    dueDate: "2024-08-15",
    status: "partiel",
    transactions: [
      { id: "T003", amount: 400000, date: "2024-05-20", method: "Virement", reference: "VIR-2024-002", receiptId: "R003" }
    ]
  },
  {
    id: "3",
    clientId: "C001",
    client: "Entreprise ABC",
    project: "Chantier Commercial",
    totalAmount: 600000,
    paidAmount: 600000,
    remainingAmount: 0,
    dueDate: "2024-06-30",
    status: "payé",
    transactions: [
      { id: "T004", amount: 300000, date: "2024-04-10", method: "Chèque", reference: "CHQ-2024-002", receiptId: "R004" },
      { id: "T005", amount: 300000, date: "2024-05-10", method: "Virement", reference: "VIR-2024-003", receiptId: "R005" }
    ]
  },
  {
    id: "4",
    clientId: "C003",
    client: "ETS Habitat Moderne",
    project: "Résidence Les Oliviers",
    totalAmount: 850000,
    paidAmount: 0,
    remainingAmount: 850000,
    dueDate: "2024-07-05",
    status: "impayé",
    transactions: []
  }
];

// Mock data for receipts
const mockReceipts = [
  { id: "R001", file: "/receipts/receipt001.pdf", client: "Entreprise ABC", amount: 300000, date: "2024-05-15" },
  { id: "R002", file: "/receipts/receipt002.pdf", client: "Entreprise ABC", amount: 300000, date: "2024-06-15" },
  { id: "R003", file: "/receipts/receipt003.pdf", client: "SARL XYZ Construction", amount: 400000, date: "2024-05-20" },
  { id: "R004", file: "/receipts/receipt004.pdf", client: "Entreprise ABC", amount: 300000, date: "2024-04-10" },
  { id: "R005", file: "/receipts/receipt005.pdf", client: "Entreprise ABC", amount: 300000, date: "2024-05-10" }
];

export function ClientPaymentsWidget() {
  const navigate = useNavigate();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient ? payment.clientId === selectedClient : true;
    const matchesProject = selectedProject ? payment.project === selectedProject : true;
    
    return matchesSearch && matchesClient && matchesProject;
  });
  
  // Get unique clients for filter
  const clients = Array.from(new Set(mockPayments.map(p => p.clientId)))
    .map(clientId => {
      const client = mockPayments.find(p => p.clientId === clientId);
      return { id: clientId, name: client?.client };
    });
  
  // Get unique projects for filter
  const projects = Array.from(new Set(mockPayments.map(p => p.project)));
  
  const totalDue = filteredPayments.reduce((acc, payment) => acc + payment.remainingAmount, 0);
  const totalPaid = filteredPayments.reduce((acc, payment) => acc + payment.paidAmount, 0);
  
  const handleNewPayment = () => {
    setShowPaymentForm(true);
  };

  const handleViewAll = () => {
    navigate("/finance/client-payments");
  };

  const handlePaymentClick = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };
  
  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowReceiptPreview(true);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Paiements Clients
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleViewAll}
                className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20 transition-all duration-200 hover:scale-105"
              >
                <Eye className="h-4 w-4 mr-2" />
                Voir tout
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleNewPayment}
                className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20 transition-all duration-200 hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-sm text-gray-400">Reste à payer</p>
                <p className="text-lg font-bold text-amber-400">{totalDue.toLocaleString('fr-FR')} DA</p>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-sm text-gray-400">Total payé</p>
                <p className="text-lg font-bold text-green-400">{totalPaid.toLocaleString('fr-FR')} DA</p>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    placeholder="Rechercher un client ou un chantier..."
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Tous les clients" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="">Tous les clients</SelectItem>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Tous les chantiers" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="">Tous les chantiers</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Payments List */}
            <div className="space-y-3">
              {filteredPayments.length > 0 ? (
                filteredPayments.map(payment => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/30 cursor-pointer group overflow-hidden"
                    onClick={() => handlePaymentClick(payment)}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{payment.client}</h3>
                          {getStatusBadge(payment.status)}
                        </div>
                        <p className="text-sm text-gray-400">Chantier: {payment.project}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Échéance: {payment.dueDate}</div>
                        <div className="flex items-center justify-end gap-4 mt-2">
                          <div className="text-right">
                            <div className="text-xs text-gray-400">Reste à payer</div>
                            <div className="font-semibold text-amber-400">
                              {payment.remainingAmount.toLocaleString('fr-FR')} DA
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400">Total</div>
                            <div className="font-semibold text-white">
                              {payment.totalAmount.toLocaleString('fr-FR')} DA
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400">
                  Aucun paiement ne correspond aux critères de recherche
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      {showPaymentDetails && selectedPayment && (
        <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
          <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                Détails des paiements - {selectedPayment.client}
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="max-h-[calc(90vh-120px)]">
              <div className="p-4 space-y-6">
                {/* Client & Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm mb-1">Client</h3>
                    <p className="text-white font-medium">{selectedPayment.client}</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm mb-1">Chantier</h3>
                    <p className="text-white font-medium">{selectedPayment.project}</p>
                  </div>
                </div>
                
                {/* Payment Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm mb-1">Montant Total</h3>
                    <p className="text-white font-medium">{selectedPayment.totalAmount.toLocaleString('fr-FR')} DA</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm mb-1">Montant Payé</h3>
                    <p className="text-green-400 font-medium">{selectedPayment.paidAmount.toLocaleString('fr-FR')} DA</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm mb-1">Reste à Payer</h3>
                    <p className="text-amber-400 font-medium">{selectedPayment.remainingAmount.toLocaleString('fr-FR')} DA</p>
                  </div>
                </div>

                {/* Transactions History */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Historique des transactions</h3>
                  
                  {selectedPayment.transactions.length > 0 ? (
                    <div className="space-y-3">
                      {selectedPayment.transactions.map((transaction: any) => {
                        const receipt = mockReceipts.find(r => r.id === transaction.receiptId);
                        
                        return (
                          <div 
                            key={transaction.id}
                            className="flex flex-wrap justify-between items-center p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
                          >
                            <div className="space-y-1">
                              <div className="font-medium text-white">
                                {transaction.amount.toLocaleString('fr-FR')} DA - {transaction.method}
                              </div>
                              <p className="text-sm text-gray-400">
                                Date: {transaction.date} | Référence: {transaction.reference}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border-blue-500/20 mt-2 sm:mt-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                receipt && handleViewReceipt(receipt);
                              }}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Voir le reçu
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-6 text-gray-400 border border-gray-700/30 rounded-lg">
                      Aucune transaction enregistrée pour ce client
                    </div>
                  )}
                </div>
                
                {/* New Payment Button */}
                <div className="flex justify-end">
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      setShowPaymentDetails(false);
                      setShowPaymentForm(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau paiement
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Receipt Preview Dialog */}
      {showReceiptPreview && selectedReceipt && (
        <Dialog open={showReceiptPreview} onOpenChange={setShowReceiptPreview}>
          <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                Reçu de paiement - {selectedReceipt.client}
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-6 space-y-6">
              {/* Receipt Header */}
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">REÇU DE PAIEMENT</h2>
                <p className="text-gray-600">Date: {selectedReceipt.date}</p>
              </div>
              
              {/* Receipt Content */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-bold text-gray-800 mb-2">DÉTAILS DU CLIENT</h3>
                  <p className="text-gray-700">Client: {selectedReceipt.client}</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-bold text-gray-800 mb-2">DÉTAILS DU PAIEMENT</h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Montant:</span> {selectedReceipt.amount.toLocaleString('fr-FR')} DA
                  </p>
                </div>
              </div>
              
              {/* Placeholder for the scanned receipt */}
              <div className="mt-8 border rounded-lg p-4 text-center">
                <img 
                  src="/receipt-placeholder.jpg" 
                  alt="Reçu scanné" 
                  className="mx-auto w-full max-w-md h-auto object-contain bg-gray-100"
                  style={{ minHeight: '400px' }}
                />
              </div>
              
              {/* Print Button */}
              <div className="flex justify-end">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    window.print();
                    toast.success("Impression du reçu");
                  }}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* New Payment Form Dialog would be imported from an external component */}
    </motion.div>
  );
}
