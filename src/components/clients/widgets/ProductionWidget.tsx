import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ProductionChart from "@/components/dashboard/ProductionChart";

interface Production {
  id: string;
  date: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
}

interface ProductionWidgetProps {
  clientId: number;
}

export function ProductionWidget({ clientId }: ProductionWidgetProps) {
  const productions: Production[] = [
    {
      id: "PRD001",
      date: "2024-03-20",
      formulation: "B25",
      volume: 30,
      status: "completed",
    }
  ];

  const getStatusBadge = (status: Production["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminée", className: "bg-green-100 text-green-800" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Production</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[300px]">
          <ProductionChart />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Production</TableHead>
              <TableHead>Date</TableHead>
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
                <TableCell>{production.formulation}</TableCell>
                <TableCell>{production.volume}</TableCell>
                <TableCell>{getStatusBadge(production.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}