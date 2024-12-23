import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Filter, Printer } from "lucide-react";
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

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Calculate total
    const totalGeneral = reports.reduce((sum, report) => sum + report.total, 0);

    // Generate the HTML content for printing
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rapport des Livraisons</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .total-row { font-weight: bold; background-color: #f5f5f5; }
            .header-info { margin-bottom: 20px; }
            .date { color: #666; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header-info">
            <h1>Rapport des Livraisons</h1>
            <p class="date">Date d'impression: ${new Date().toLocaleDateString()}</p>
            ${startDate && endDate ? `<p>Période: Du ${startDate} au ${endDate}</p>` : ''}
            ${selectedSupplier ? `<p>Fournisseur: ${selectedSupplier}</p>` : ''}
            ${selectedProduct ? `<p>Produit: ${selectedProduct}</p>` : ''}
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Fournisseur</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${reports.map(report => `
                <tr>
                  <td>${report.date}</td>
                  <td>${report.supplier}</td>
                  <td>${report.product}</td>
                  <td>${report.quantity} T</td>
                  <td>${report.price.toLocaleString()} DA</td>
                  <td>${report.total.toLocaleString()} DA</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="5" style="text-align: right;">Total Général:</td>
                <td>${totalGeneral.toLocaleString()} DA</td>
              </tr>
            </tbody>
          </table>
          <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px;">
            Imprimer
          </button>
        </body>
      </html>
    `;

    // Write the content to the new window and print
    printWindow.document.write(printContent);
    printWindow.document.close();
    console.log("Opening print window");
    toast.success("Fenêtre d'impression ouverte");
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

            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Version imprimable
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