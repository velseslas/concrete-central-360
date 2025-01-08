import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface InvoiceFiltersProps {
  selectedClient: string;
  selectedStatus: string;
  startDate: string;
  endDate: string;
  onClientChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onGenerateReport: () => void;
}

export function InvoiceFilters({
  selectedClient,
  selectedStatus,
  startDate,
  endDate,
  onClientChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onGenerateReport
}: InvoiceFiltersProps) {
  console.log("Current filter values:", { selectedClient, selectedStatus, startDate, endDate });

  return (
    <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={selectedClient} onValueChange={onClientChange}>
          <SelectTrigger className="bg-gray-900/50 border-gray-700">
            <SelectValue placeholder="Sélectionner un client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les clients</SelectItem>
            <SelectItem value="EURL Construction Plus">EURL Construction Plus</SelectItem>
            <SelectItem value="SARL Travaux Publics">SARL Travaux Publics</SelectItem>
            <SelectItem value="ETS Batiment">ETS Batiment</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="bg-gray-900/50 border-gray-700">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="paid">Payée</SelectItem>
            <SelectItem value="unpaid">Impayée</SelectItem>
            <SelectItem value="validated">Validée</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="bg-gray-900/50 border-gray-700 text-white"
        />

        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="bg-gray-900/50 border-gray-700 text-white"
        />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onGenerateReport}
          variant="outline"
          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
        >
          <Filter className="h-4 w-4 mr-2" />
          Générer le rapport
        </Button>
      </div>
    </div>
  );
}