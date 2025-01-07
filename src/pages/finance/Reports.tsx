import { motion } from "framer-motion";
import { FileText, Download, Filter, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export default function Reports() {
  const handleGenerateReport = () => {
    console.log("Generating financial report");
    toast.success("Rapport généré avec succès");
  };

  const handleExport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
    toast.success(`Export en ${format} en cours...`);
  };

  // Données d'exemple pour le tableau
  const reportData = [
    {
      id: 1,
      date: "2024-03-20",
      type: "Paiement Client",
      reference: "PAY-001",
      amount: 150000,
      status: "Complété"
    },
    {
      id: 2,
      date: "2024-03-19",
      type: "Paiement Fournisseur",
      reference: "PAY-002",
      amount: -75000,
      status: "En attente"
    },
    {
      id: 3,
      date: "2024-03-18",
      type: "Facture",
      reference: "INV-001",
      amount: 200000,
      status: "Payée"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-8"
      >
        Rapports Financiers
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget Génération de Rapports */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Générer un Rapport
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type de rapport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payments">Paiements</SelectItem>
                <SelectItem value="invoices">Factures</SelectItem>
                <SelectItem value="expenses">Dépenses</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <Input type="date" placeholder="Date début" />
              <Input type="date" placeholder="Date fin" />
            </div>

            <Button 
              onClick={handleGenerateReport}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Générer
            </Button>
          </CardContent>
        </Card>

        {/* Widget Export */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-green-400" />
              Exporter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => handleExport('PDF')}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border-red-500/20"
            >
              Export PDF
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExport('Excel')}
              className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20"
            >
              Export Excel
            </Button>
          </CardContent>
        </Card>

        {/* Widget Statistiques */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Paiements</span>
                <span className="text-lg font-bold text-white">275,000 DA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Factures en attente</span>
                <span className="text-lg font-bold text-white">75,000 DA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Balance</span>
                <span className="text-lg font-bold text-green-400">+200,000 DA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des Transactions */}
      <Card className="mt-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-400" />
            Transactions Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.reference}</TableCell>
                  <TableCell className={row.amount > 0 ? "text-green-400" : "text-red-400"}>
                    {row.amount.toLocaleString()} DA
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}