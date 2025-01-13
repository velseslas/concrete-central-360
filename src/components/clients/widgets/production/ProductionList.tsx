import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Production } from "./types";

interface ProductionListProps {
  productions: Production[];
}

export function ProductionList({ productions }: ProductionListProps) {
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

  return (
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
  );
}