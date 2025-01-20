import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  clients: Array<{ id: string; name: string }>;
}

export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedClient,
  setSelectedClient,
  selectedStatus,
  setSelectedStatus,
  clients,
}: ProjectFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  const statuses = ["Tous", "En cours", "Terminé"];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Rechercher un chantier..." 
          className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
            <SelectValue placeholder="Année" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-gray-200">Toutes les années</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year} className="text-gray-200">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
            <SelectValue placeholder="Client" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-gray-200">Tous les clients</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id} className="text-gray-200">
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-gray-200">Tous les statuts</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status} className="text-gray-200">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}