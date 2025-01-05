import { motion } from "framer-motion";
import { ProductionWidget } from "@/components/production/ProductionWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Production = () => {
  // Données de production pour l'exemple
  const productions = [
    {
      id: "PRD001",
      date: "2024-03-20",
      client: "Client A",
      formulation: "B25",
      volume: 30,
      status: "completed",
    },
    {
      id: "PRD002",
      date: "2024-03-20",
      client: "Client B",
      formulation: "B30",
      volume: 45,
      status: "in_progress",
    },
    {
      id: "PRD003",
      date: "2024-03-20",
      client: "Client C",
      formulation: "B40",
      volume: 25,
      status: "pending",
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminée", className: "bg-green-100 text-green-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 xl:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Section principale avec les statistiques */}
        <div className="grid grid-cols-1 gap-8">
          <ProductionWidget />
        </div>

        {/* Liste des productions */}
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Liste des Productions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Production</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Formulation</TableHead>
                    <TableHead>Volume (m³)</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productions.map((production) => (
                    <TableRow key={production.id}>
                      <TableCell className="font-medium">{production.id}</TableCell>
                      <TableCell>{production.date}</TableCell>
                      <TableCell>{production.client}</TableCell>
                      <TableCell>{production.formulation}</TableCell>
                      <TableCell>{production.volume}</TableCell>
                      <TableCell>{getStatusBadge(production.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Production;