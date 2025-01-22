import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProjectPreviewDialog } from "./ProjectPreviewDialog";
import { useState } from "react";

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
  showSearchOnly: boolean;
  projects: any[];
}

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) => (
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    <Input 
      placeholder="Rechercher un chantier..." 
      className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

const FilterSelects = ({
  selectedYear,
  setSelectedYear,
  selectedClient,
  setSelectedClient,
  selectedStatus,
  setSelectedStatus,
  clients
}: {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  clients: Array<{ id: string; name: string }>;
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  const statuses = ["En cours", "Terminé"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
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
  );
};

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
  showSearchOnly,
  projects,
}: ProjectFiltersProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (showSearchOnly) {
    return (
      <div className="flex items-center gap-4 flex-1 md:max-w-xs">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <FilterSelects
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        clients={clients}
      />
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            size="icon"
            className="bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50"
          >
            <Eye className="h-4 w-4 text-gray-300" />
          </Button>
        </DialogTrigger>
        <ProjectPreviewDialog 
          projects={projects}
          onOpenChange={setPreviewOpen}
        />
      </Dialog>
    </div>
  );
}