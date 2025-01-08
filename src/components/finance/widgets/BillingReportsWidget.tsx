import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useState } from "react";
import { InvoiceFilters } from "./invoice/components/InvoiceFilters";
import { InvoiceReportPreview } from "./invoice/components/InvoiceReportPreview";
import { Invoice } from "@/types/invoice";
import { toast } from "sonner";

export function BillingReportsWidget() {
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const invoices: Invoice[] = [
    {
      id: "FA-2024-001",
      client: "EURL Construction Plus",
      amount: "150,000 DA",
      date: "2024-03-15",
      status: "unpaid"
    },
    {
      id: "FA-2024-002",
      client: "SARL Travaux Publics",
      amount: "95,000 DA",
      date: "2024-03-13",
      status: "paid"
    },
    {
      id: "FA-2024-003",
      client: "ETS Batiment",
      amount: "120,000 DA",
      date: "2024-03-10",
      status: "validated"
    }
  ];

  const handleGenerateReport = () => {
    console.log("Génération du rapport avec les filtres:", {
      client: selectedClient,
      status: selectedStatus,
      startDate,
      endDate
    });
    setShowPreview(true);
    toast.success("Rapport généré avec succès");
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (selectedClient !== "all" && invoice.client !== selectedClient) return false;
    if (selectedStatus !== "all" && invoice.status !== selectedStatus) return false;
    if (startDate && new Date(invoice.date) < new Date(startDate)) return false;
    if (endDate && new Date(invoice.date) > new Date(endDate)) return false;
    return true;
  });

  console.log("Filtered invoices:", filteredInvoices);

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
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            Rapports de Facturation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <InvoiceFilters
              selectedClient={selectedClient}
              selectedStatus={selectedStatus}
              startDate={startDate}
              endDate={endDate}
              onClientChange={setSelectedClient}
              onStatusChange={setSelectedStatus}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onGenerateReport={handleGenerateReport}
            />

            <InvoiceReportPreview
              open={showPreview}
              onOpenChange={setShowPreview}
              invoices={filteredInvoices}
              filters={{
                client: selectedClient,
                status: selectedStatus,
                startDate,
                endDate
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}