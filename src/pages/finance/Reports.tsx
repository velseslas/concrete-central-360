import { motion } from "framer-motion";
import { FileText, Download, Filter, TrendingUp, ChartBar, Printer, FileSpreadsheet } from "lucide-react";
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
    <div className="container mx-auto p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        {/* En-tête avec titre et statistiques rapides */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-white">Rapports Financiers</h1>
          <div className="flex gap-4">
            <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg">
              <span className="block text-sm">Total Entrées</span>
              <span className="text-xl font-bold">350,000 DA</span>
            </div>
            <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg">
              <span className="block text-sm">Total Sorties</span>
              <span className="text-xl font-bold">-75,000 DA</span>
            </div>
          </div>
        </div>

        {/* Section principale avec les widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Widget de Génération de Rapports */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-6 w-6 text-blue-400" />
                Générer un Rapport
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Select>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="quarter">Ce trimestre</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="date" className="bg-gray-800/50 border-gray-700" placeholder="Date début" />
                <Input type="date" className="bg-gray-800/50 border-gray-700" placeholder="Date fin" />
              </div>
              <Button 
                onClick={handleGenerateReport}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Générer le Rapport
              </Button>
            </CardContent>
          </Card>

          {/* Widget d'Export */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-6 w-6 text-purple-400" />
                Options d'Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => handleExport('PDF')}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border-red-500/20"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleExport('Excel')}
                className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleExport('Print')}
                className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border-blue-500/20"
              >
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des Transactions */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              Transactions Récentes
            </CardTitle>
            <Button variant="outline" className="bg-gray-800/50 border-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
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
                    <TableRow key={row.id} className="bg-gray-800/30 hover:bg-gray-800/50">
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
      </motion.div>
    </div>
  );
}