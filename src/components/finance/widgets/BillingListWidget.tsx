import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Plus, Search, DollarSign, Printer } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Invoice {
  id: string;
  client: string;
  amount: string;
  date: string;
  status: "pending" | "paid" | "overdue";
}

export function BillingListWidget() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mockInvoices: Invoice[] = [
    { id: "FA-2024-001", client: "EURL Construction Plus", amount: "150,000 DA", date: "2024-03-15", status: "pending" },
    { id: "FA-2024-002", client: "SPA Bâtiment Pro", amount: "280,000 DA", date: "2024-03-14", status: "paid" },
    { id: "FA-2024-003", client: "SARL Travaux Publics", amount: "95,000 DA", date: "2024-03-13", status: "overdue" },
    { id: "FA-2024-004", client: "ETS Batiment", amount: "120,000 DA", date: "2024-03-12", status: "pending" },
    { id: "FA-2024-005", client: "SARL BTP Services", amount: "175,000 DA", date: "2024-03-11", status: "paid" },
  ];

  const handleInvoiceClick = (invoice: Invoice) => {
    console.log("Facture sélectionnée:", invoice);
    setSelectedInvoice(invoice);
    setShowDetails(true);
  };

  const handleCreateInvoice = () => {
    toast.info("Création d'une nouvelle facture...");
  };

  const handlePrintInvoice = () => {
    toast.success("Impression de la facture " + selectedInvoice?.id);
  };

  const handleDownloadInvoice = () => {
    toast.success("Téléchargement de la facture " + selectedInvoice?.id);
  };

  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              Gestion des Factures
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher une facture..." 
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleCreateInvoice}
                variant="outline" 
                size="sm" 
                className="text-white bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Facture
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleInvoiceClick(invoice)}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      {invoice.id}
                    </h3>
                    <p className="text-gray-400 text-sm">{invoice.client}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-medium">{invoice.amount}</p>
                      <p className="text-gray-400 text-sm">{invoice.date}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        invoice.status === "paid" ? "bg-green-500/20 text-green-400" :
                        invoice.status === "overdue" ? "bg-red-500/20 text-red-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {invoice.status === "paid" ? "Payée" :
                         invoice.status === "overdue" ? "En retard" :
                         "En attente"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Détails de la Facture {selectedInvoice?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Client</p>
                <p className="text-white font-medium">{selectedInvoice?.client}</p>
              </div>
              <div>
                <p className="text-gray-400">Montant</p>
                <p className="text-white font-medium">{selectedInvoice?.amount}</p>
              </div>
              <div>
                <p className="text-gray-400">Date</p>
                <p className="text-white font-medium">{selectedInvoice?.date}</p>
              </div>
              <div>
                <p className="text-gray-400">Statut</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedInvoice?.status === "paid" ? "bg-green-500/20 text-green-400" :
                  selectedInvoice?.status === "overdue" ? "bg-red-500/20 text-red-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {selectedInvoice?.status === "paid" ? "Payée" :
                   selectedInvoice?.status === "overdue" ? "En retard" :
                   "En attente"}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleDownloadInvoice}
                className="bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 text-primary-foreground transition-all duration-200"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button
                variant="default"
                onClick={handlePrintInvoice}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}