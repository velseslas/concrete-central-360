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
    <div className="container mx-auto p-6 space-y-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-8"
      >
        Rapports Financiers
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Widget Génération de Rapports */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-6 w-6 text-blue-400" />
              Générer un Rapport
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select>
              <SelectTrigger className="bg-gray-800/50 border-gray-700">
                <SelectValue placeholder="Type de rapport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payments">Paiements</SelectItem>
                <SelectItem value="invoices">Factures</SelectItem>
                <SelectItem value="expenses">Dépenses</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <Input type="date" placeholder="Date début" className="bg-gray-800/50 border-gray-700" />
              <Input type="date" placeholder="Date fin" className="bg-gray-800/50 border-gray-700" />
            </div>

            <Button 
              onClick={handleGenerateReport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Générer
            </Button>
          </CardContent>
        </Card>

        {/* Widget Export */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Download className="h-6 w-6 text-green-400" />
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
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <p className="text-gray-400 text-sm">Total Paiements</p>
                <p className="text-2xl font-bold text-white mt-1">275,000 DA</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <p className="text-gray-400 text-sm">Factures en attente</p>
                <p className="text-2xl font-bold text-white mt-1">75,000 DA</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <p className="text-gray-400 text-sm">Balance</p>
                <p className="text-2xl font-bold text-green-400 mt-1">+200,000 DA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des Transactions */}
      <Card className="mt-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Filter className="h-6 w-6 text-blue-400" />
            Transactions Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-gray-700/50">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800/50 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Référence</TableHead>
                  <TableHead className="text-gray-300 text-right">Montant</TableHead>
                  <TableHead className="text-gray-300">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow key={row.id} className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                    <TableCell className="text-gray-300">{row.date}</TableCell>
                    <TableCell className="text-gray-300">{row.type}</TableCell>
                    <TableCell className="text-gray-300">{row.reference}</TableCell>
                    <TableCell className={`text-right ${row.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                      {row.amount.toLocaleString()} DA
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        row.status === 'Complété' || row.status === 'Payée' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}