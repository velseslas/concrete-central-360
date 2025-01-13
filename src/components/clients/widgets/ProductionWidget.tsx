import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";
import { ProductionForm } from "./ProductionForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Production {
  id: number;
  order_id: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
  start_date: string;
  end_date: string | null;
  notes: string | null;
  client: string;
  project: string;
}

export function ProductionWidget() {
  const [showProductionForm, setShowProductionForm] = useState(false);
  const [productions, setProductions] = useState<Production[]>([]);

  const fetchProductions = async () => {
    console.log("Fetching productions...");
    const { data, error } = await supabase
      .from("productions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching productions:", error);
      toast.error("Erreur lors du chargement des productions");
      return;
    }

    console.log("Productions fetched:", data);
    const typedData = data?.map(prod => ({
      ...prod,
      status: (prod.status || "pending") as "pending" | "in_progress" | "completed"
    })) || [];

    setProductions(typedData);
  };

  const getStatusBadge = (status: Production["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-400" },
      in_progress: { label: "En cours", className: "bg-blue-500/20 text-blue-400" },
      completed: { label: "Terminée", className: "bg-green-500/20 text-green-400" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            Productions
          </CardTitle>
          <Button
            onClick={() => setShowProductionForm(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle production
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-hidden border border-gray-700/50">
          <Table>
            <TableHeader className="bg-gray-800/50">
              <TableRow>
                <TableHead className="text-gray-300">ID</TableHead>
                <TableHead className="text-gray-300">Client</TableHead>
                <TableHead className="text-gray-300">Projet</TableHead>
                <TableHead className="text-gray-300">Formulation</TableHead>
                <TableHead className="text-gray-300">Volume (m³)</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
                <TableHead className="text-gray-300">Date début</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productions.map((production) => (
                <TableRow key={production.id} className="hover:bg-gray-800/30">
                  <TableCell className="font-medium text-white">{production.order_id}</TableCell>
                  <TableCell className="text-gray-300">{production.client}</TableCell>
                  <TableCell className="text-gray-300">{production.project}</TableCell>
                  <TableCell className="text-gray-300">{production.formulation}</TableCell>
                  <TableCell className="text-gray-300">{production.volume}</TableCell>
                  <TableCell>{getStatusBadge(production.status)}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(production.start_date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <ProductionForm
        open={showProductionForm}
        onOpenChange={(open) => {
          setShowProductionForm(open);
          if (!open) {
            fetchProductions();
          }
        }}
      />
    </Card>
  );
}