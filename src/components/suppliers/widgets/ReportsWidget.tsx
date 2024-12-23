import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Filter } from "lucide-react";
import { toast } from "sonner";

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

  // Données d'exemple plus complètes
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
    },
    {
      id: "3",
      date: "2024-03-22",
      supplier: "SARL CIMENT PLUS",
      product: "Ciment",
      quantity: 150,
      price: 1200,
      total: 180000
    },
    {
      id: "4",
      date: "2024-03-23",
      supplier: "SPA SABLE",
      product: "Sable Fin",
      quantity: 75,
      price: 600,
      total: 45000
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

  // Calcul du total général
  const totalGeneral = reports.reduce((sum, report) => sum + report.total, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Rapports des livraisons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filtres</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un fournisseur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier-1">SARL CIMENT PLUS</SelectItem>
                <SelectItem value="supplier-2">EURL AGREGATS</SelectItem>
                <SelectItem value="supplier-3">SPA SABLE</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ciment">Ciment</SelectItem>
                <SelectItem value="gravier">Gravier 8/15</SelectItem>
                <SelectItem value="sable">Sable Fin</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Date début"
            />

            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Date fin"
            />

            <Button onClick={handleGenerateReport}>
              Générer le rapport
            </Button>
          </div>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Prix unitaire</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.supplier}</TableCell>
                    <TableCell>{report.product}</TableCell>
                    <TableCell>{report.quantity} T</TableCell>
                    <TableCell>{report.price.toLocaleString()} DA</TableCell>
                    <TableCell>{report.total.toLocaleString()} DA</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-gray-50">
                  <TableCell colSpan={5} className="text-right">Total Général:</TableCell>
                  <TableCell>{totalGeneral.toLocaleString()} DA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}