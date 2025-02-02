import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileChartLine, Filter, Printer } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Report {
  id: string;
  date: string;
  supplier: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
}

export function ReportsWidget() {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const reports: Report[] = [
    {
      id: "1",
      date: "2024-03-20",
      supplier: "SARL CIMENT PLUS",
      product: "Ciment",
      quantity: 100,
      price: 1200,
      total: 120000
    },
    {
      id: "2",
      date: "2024-03-21",
      supplier: "EURL AGREGATS",
      product: "Gravier 8/15",
      quantity: 50,
      price: 800,
      total: 40000
    }
  ];

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", {
      supplier: selectedSupplier,
      product: selectedProduct,
      startDate,
      endDate,
    });
    toast.success("Rapport généré avec succès");
  };

  const handlePrint = () => {
    console.log("Impression du rapport");
    window.print();
  };

  const totalGeneral = reports.reduce((sum, report) => sum + report.total, 0);

  return (
    <Card className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
            <FileChartLine className="h-5 w-5 text-indigo-400" />
          </div>
          Rapports des livraisons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-indigo-400" />
            <span className="font-medium text-white">Filtres</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger className="bg-gray-800/30 border-gray-700/50">
                <SelectValue placeholder="Sélectionner un fournisseur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier-1">SARL CIMENT PLUS</SelectItem>
                <SelectItem value="supplier-2">EURL AGREGATS</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="bg-gray-800/30 border-gray-700/50">
                <SelectValue placeholder="Sélectionner un produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ciment">Ciment</SelectItem>
                <SelectItem value="gravier">Gravier 8/15</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-800/30 border-gray-700/50"
            />

            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-800/30 border-gray-700/50"
            />

            <Button 
              onClick={handleGenerateReport}
              className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-300"
            >
              Générer le rapport
            </Button>

            <Button 
              onClick={handlePrint} 
              variant="outline"
              className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-300"
            >
              <Printer className="h-4 w-4 mr-2" />
              Version imprimable
            </Button>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-gray-700/50">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700/50 bg-gray-800/30">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Fournisseur</TableHead>
                  <TableHead className="text-gray-300">Produit</TableHead>
                  <TableHead className="text-gray-300">Quantité</TableHead>
                  <TableHead className="text-gray-300">Prix unitaire</TableHead>
                  <TableHead className="text-gray-300">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} className="border-gray-700/50">
                    <TableCell className="text-gray-300">{report.date}</TableCell>
                    <TableCell className="text-gray-300">{report.supplier}</TableCell>
                    <TableCell className="text-gray-300">{report.product}</TableCell>
                    <TableCell className="text-gray-300">{report.quantity} T</TableCell>
                    <TableCell className="text-gray-300">{report.price.toLocaleString()} DA</TableCell>
                    <TableCell className="text-gray-300">{report.total.toLocaleString()} DA</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-gray-700/50 bg-gray-800/30 font-bold">
                  <TableCell colSpan={5} className="text-right text-gray-300">Total Général:</TableCell>
                  <TableCell className="text-gray-300">{totalGeneral.toLocaleString()} DA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}