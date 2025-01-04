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
  client: string;
  project: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
}

export function ReportsWidget() {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  // Données d'exemple plus complètes
  const reports: Report[] = [
    {
      id: "1",
      date: "2024-03-20",
      client: "EURL BATIMENT PLUS",
      project: "Construction Villa",
      product: "B25",
      quantity: 30,
      price: 12000,
      total: 360000
    },
    {
      id: "2",
      date: "2024-03-21",
      client: "SARL CONSTRUCTION MODERNE",
      project: "Immeuble 20 Logements",
      product: "B30",
      quantity: 45,
      price: 13000,
      total: 585000
    },
    {
      id: "3",
      date: "2024-03-22",
      client: "EURL BATIMENT PLUS",
      project: "Construction Villa",
      product: "B20",
      quantity: 25,
      price: 11000,
      total: 275000
    },
    {
      id: "4",
      date: "2024-03-23",
      client: "SPA IMMOBILIER",
      project: "Centre Commercial",
      product: "B40",
      quantity: 60,
      price: 14000,
      total: 840000
    }
  ];

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", {
      client: selectedClient,
      project: selectedProject,
      startDate,
      endDate,
      product: selectedProduct,
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
          Rapports des ventes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filtres</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client-1">EURL BATIMENT PLUS</SelectItem>
                <SelectItem value="client-2">SARL CONSTRUCTION MODERNE</SelectItem>
                <SelectItem value="client-3">SPA IMMOBILIER</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project-1">Construction Villa</SelectItem>
                <SelectItem value="project-2">Immeuble 20 Logements</SelectItem>
                <SelectItem value="project-3">Centre Commercial</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="b20">B20</SelectItem>
                <SelectItem value="b25">B25</SelectItem>
                <SelectItem value="b30">B30</SelectItem>
                <SelectItem value="b40">B40</SelectItem>
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
                  <TableHead>Client</TableHead>
                  <TableHead>Projet</TableHead>
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
                    <TableCell>{report.client}</TableCell>
                    <TableCell>{report.project}</TableCell>
                    <TableCell>{report.product}</TableCell>
                    <TableCell>{report.quantity} m³</TableCell>
                    <TableCell>{report.price.toLocaleString()} DA</TableCell>
                    <TableCell>{report.total.toLocaleString()} DA</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-gray-50">
                  <TableCell colSpan={6} className="text-right">Total Général:</TableCell>
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