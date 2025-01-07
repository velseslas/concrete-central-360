import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { InvoiceDetailsDialog } from "./invoice/InvoiceDetailsDialog";

interface Invoice {
  id: string;
  client: string;
  amount: string;
  date: string;
  status: "pending" | "paid" | "overdue" | "validated";
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

  const handleStatusChange = (newStatus: Invoice["status"]) => {
    if (selectedInvoice) {
      const statusMessages = {
        pending: "En attente de validation",
        paid: "Marquée comme payée",
        overdue: "Marquée comme en retard",
        validated: "Facture validée"
      };

      toast.success(`Facture ${selectedInvoice.id} : ${statusMessages[newStatus]}`);
      setSelectedInvoice({ ...selectedInvoice, status: newStatus });
    }
  };

  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Invoice["status"]) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400",
      paid: "bg-green-500/20 text-green-400",
      overdue: "bg-red-500/20 text-red-400",
      validated: "bg-blue-500/20 text-blue-400"
    };
    return colors[status];
  };

  const getStatusLabel = (status: Invoice["status"]) => {
    const labels = {
      pending: "En attente",
      paid: "Payée",
      overdue: "En retard",
      validated: "Validée"
    };
    return labels[status];
  };

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
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusLabel(invoice.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <InvoiceDetailsDialog
        invoice={selectedInvoice}
        open={showDetails}
        onOpenChange={setShowDetails}
        onStatusChange={handleStatusChange}
      />
    </motion.div>
  );
}