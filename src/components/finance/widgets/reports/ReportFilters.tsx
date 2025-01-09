import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { ReportPreviewDialog } from "./ReportPreviewDialog";

interface ReportFiltersProps {
  clients: Array<{ id: string; name: string }>;
}

export function ReportFilters({ clients }: ReportFiltersProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [filters, setFilters] = useState({
    clientId: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const statuses = [
    { id: "pending", label: "En attente" },
    { id: "paid", label: "Payé" },
    { id: "cancelled", label: "Annulé" },
  ];

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", filters);
    setShowPreview(true);
  };

  return (
    <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select 
          value={filters.clientId} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, clientId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.status} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status.id} value={status.id}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
          placeholder="Date début"
          className="bg-gray-900/50"
        />

        <Input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
          placeholder="Date fin"
          className="bg-gray-900/50"
        />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleGenerateReport}
          variant="outline"
          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
        >
          <Filter className="h-4 w-4 mr-2" />
          Générer
        </Button>
      </div>

      <ReportPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        filters={filters}
      />
    </div>
  );
}