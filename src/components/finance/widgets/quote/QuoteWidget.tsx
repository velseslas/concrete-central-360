import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { QuoteHeader } from "./components/QuoteHeader";
import { QuoteList } from "./components/QuoteList";
import { QuoteDetails } from "./components/QuoteDetails";
import { AdvancedFilters } from "./components/AdvancedFilters";
import { Quote, QuoteFilters } from "./types";
import { CreateQuoteDialog } from "./CreateQuoteDialog";

const mockQuotes: Quote[] = [
  { 
    id: "DV-2024-001", 
    client: "EURL Construction Plus", 
    amount: "150,000 DA", 
    date: "2024-03-15", 
    status: "pending",
    description: "Travaux de construction",
    validUntil: "2024-04-15"
  },
  { 
    id: "DV-2024-002", 
    client: "SPA Bâtiment Pro", 
    amount: "280,000 DA", 
    date: "2024-03-14", 
    status: "accepted",
    description: "Rénovation complète",
    validUntil: "2024-04-14"
  },
  { 
    id: "DV-2024-003", 
    client: "SARL Travaux Publics", 
    amount: "95,000 DA", 
    date: "2024-03-13", 
    status: "rejected",
    description: "Travaux d'aménagement",
    validUntil: "2024-04-13"
  },
];

export function QuoteWidget() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<QuoteFilters>({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    status: ""
  });

  const handleQuoteClick = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowDetails(true);
  };

  const handlePrintQuote = () => {
    toast.success("Impression du devis " + selectedQuote?.id);
  };

  const handleExportQuote = () => {
    toast.success("Export du devis " + selectedQuote?.id + " en PDF");
  };

  const handleCreateClick = () => {
    console.log("QuoteWidget - Tentative d'ouverture du dialogue de création");
    setShowCreateDialog(true);
  };

  const handleResetFilters = () => {
    setFilters({
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

    const matchesDateRange = (!filters.startDate || quote.date >= filters.startDate) &&
                            (!filters.endDate || quote.date <= filters.endDate);

    const amount = parseInt(quote.amount.replace(/[^0-9]/g, ""));
    const matchesAmount = (!filters.minAmount || amount >= parseInt(filters.minAmount)) &&
                         (!filters.maxAmount || amount <= parseInt(filters.maxAmount));

    const matchesStatus = !filters.status || quote.status === filters.status;

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
          <QuoteHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showAdvancedFilters={showAdvancedFilters}
            setShowAdvancedFilters={setShowAdvancedFilters}
            onCreateClick={handleCreateClick}
          />
        </CardHeader>
        <CardContent>
          {showAdvancedFilters && (
            <div className="mb-4">
              <AdvancedFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          )}
          <QuoteList
            quotes={filteredQuotes}
            onQuoteClick={handleQuoteClick}
          />
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <QuoteDetails
          quote={selectedQuote}
          onExport={handleExportQuote}
          onPreview={() => setShowDetails(true)}
          onPrint={handlePrintQuote}
        />
      </Dialog>

      <CreateQuoteDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </motion.div>
  );
}