import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";

export function ReportsWidget() {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleGenerateReport = () => {
    console.log("Génération du rapport avec les filtres:", {
      supplier: selectedSupplier,
      product: selectedProduct,
      startDate,
      endDate,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Rapports Fournisseurs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un fournisseur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier-1">Fournisseur 1</SelectItem>
                <SelectItem value="supplier-2">Fournisseur 2</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-1">Produit 1</SelectItem>
                <SelectItem value="product-2">Produit 2</SelectItem>
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
                  <TableHead>Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Les données du rapport seront affichées ici */}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}