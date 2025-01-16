import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Production } from "../types";

interface ProductionReportTemplateProps {
  productions: Production[];
}

export function ProductionReportTemplate({ productions }: ProductionReportTemplateProps) {
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
    <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Rapport de Production</h2>
        <p className="text-gray-400">
          Généré le {format(new Date(), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
        </p>
      </div>

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
                {format(new Date(production.start_date), "d MMMM yyyy", { locale: fr })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Résumé</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400">Total des productions</p>
            <p className="text-2xl font-bold text-white">{productions.length}</p>
          </div>
          <div>
            <p className="text-gray-400">Volume total</p>
            <p className="text-2xl font-bold text-white">
              {productions.reduce((acc, curr) => acc + curr.volume, 0)} m³
            </p>
          </div>
          <div>
            <p className="text-gray-400">Formulations utilisées</p>
            <p className="text-2xl font-bold text-white">
              {new Set(productions.map(p => p.formulation)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}