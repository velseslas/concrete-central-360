import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export function ReportsWidget() {
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Données de démonstration
  const invoices = [
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

  const handleDownload = () => {
    console.log("Téléchargement du rapport");
    toast.success("Téléchargement du rapport en cours...");
  };

  const handlePrint = () => {
    console.log("Impression du rapport");
    window.print();
    toast.success("Impression lancée");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-400';
      case 'unpaid':
        return 'bg-red-500/10 text-red-400';
      case 'validated':
        return 'bg-blue-500/10 text-blue-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'unpaid':
        return 'Impayée';
      case 'validated':
        return 'Validée';
      default:
        return status;
    }
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
              Rapports de Facturation
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 text-primary-foreground"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button 
                onClick={handlePrint}
                variant="outline"
                className="bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 text-primary-foreground"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-900/50">
                <TableRow className="hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">N° Facture</TableHead>
                  <TableHead className="text-gray-400">Client</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400 text-right">Montant</TableHead>
                  <TableHead className="text-gray-400 text-center">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow 
                    key={invoice.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <TableCell className="text-gray-300">{invoice.id}</TableCell>
                    <TableCell className="text-gray-300">{invoice.client}</TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(invoice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-gray-300 text-right">{invoice.amount}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}