import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Plus, Search, Calculator, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { CreateQuoteDialog } from "./quote/CreateQuoteDialog";
import { AdvancedFilters, FilterValues } from "./quote/AdvancedFilters";

interface Quote {
  id: string;
  client: string;
  amount: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
}

export function QuoteWidget() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    status: ""
  });

  console.log("QuoteWidget - État du dialogue de création:", showCreateDialog);

  const mockQuotes: Quote[] = [
    { id: "DV-2024-001", client: "EURL Construction Plus", amount: "150,000 DA", date: "2024-03-15", status: "pending" },
    { id: "DV-2024-002", client: "SPA Bâtiment Pro", amount: "280,000 DA", date: "2024-03-14", status: "accepted" },
    { id: "DV-2024-003", client: "SARL Travaux Publics", amount: "95,000 DA", date: "2024-03-13", status: "rejected" },
  ];

  const handleQuoteClick = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowDetails(true);
  };

  const handlePrintQuote = () => {
    toast.success("Impression du devis " + selectedQuote?.id);
  };

  const handleDownloadQuote = () => {
    toast.success("Téléchargement du devis " + selectedQuote?.id);
  };

  const handleCreateClick = () => {
    console.log("QuoteWidget - Tentative d'ouverture du dialogue de création");
    setShowCreateDialog(true);
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
    console.log("Filtres appliqués:", newFilters);
  };

  const handleResetFilters = () => {
    setActiveFilters({
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
      status: ""
    });
    setShowAdvancedFilters(false);
  };

  const filteredQuotes = mockQuotes.filter(quote => {
    const matchesSearch = quote.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.client.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDateRange = (!activeFilters.startDate || quote.date >= activeFilters.startDate) &&
                            (!activeFilters.endDate || quote.date <= activeFilters.endDate);

    const amount = parseInt(quote.amount.replace(/[^0-9]/g, ""));
    const matchesAmount = (!activeFilters.minAmount || amount >= parseInt(activeFilters.minAmount)) &&
                         (!activeFilters.maxAmount || amount <= parseInt(activeFilters.maxAmount));

    const matchesStatus = !activeFilters.status || quote.status === activeFilters.status;

    return matchesSearch && matchesDateRange && matchesAmount && matchesStatus;
  });

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
              <Calculator className="h-6 w-6 text-blue-400" />
              Gestion des Devis
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher un devis..." 
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                variant="outline"
                className="bg-gray-800/50 hover:bg-gray-700/50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres avancés
              </Button>
              <Button 
                onClick={handleCreateClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                Nouveau Devis
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showAdvancedFilters && (
            <div className="mb-4">
              <AdvancedFilters
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          )}
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleQuoteClick(quote)}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      {quote.id}
                    </h3>
                    <p className="text-gray-400 text-sm">{quote.client}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-medium">{quote.amount}</p>
                      <p className="text-gray-400 text-sm">{quote.date}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        quote.status === "accepted" ? "bg-green-500/20 text-green-400" :
                        quote.status === "rejected" ? "bg-red-500/20 text-red-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {quote.status === "accepted" ? "Accepté" : 
                         quote.status === "rejected" ? "Refusé" : 
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
              Détails du Devis {selectedQuote?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Client</p>
                <p className="text-white font-medium">{selectedQuote?.client}</p>
              </div>
              <div>
                <p className="text-gray-400">Montant</p>
                <p className="text-white font-medium">{selectedQuote?.amount}</p>
              </div>
              <div>
                <p className="text-gray-400">Date</p>
                <p className="text-white font-medium">{selectedQuote?.date}</p>
              </div>
              <div>
                <p className="text-gray-400">Statut</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedQuote?.status === "accepted" ? "bg-green-500/20 text-green-400" :
                  selectedQuote?.status === "rejected" ? "bg-red-500/20 text-red-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {selectedQuote?.status === "accepted" ? "Accepté" : 
                   selectedQuote?.status === "rejected" ? "Refusé" : 
                   "En attente"}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleDownloadQuote}
                className="bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 text-primary-foreground transition-all duration-200"
              >
                <FileText className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button
                variant="default"
                onClick={handlePrintQuote}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CreateQuoteDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </motion.div>
  );
}