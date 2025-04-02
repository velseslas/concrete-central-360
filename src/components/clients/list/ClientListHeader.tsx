
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface ClientListHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isNewClientDialogOpen: boolean;
  setIsNewClientDialogOpen: (value: boolean) => void;
}

export function ClientListHeader({
  searchQuery,
  onSearchChange,
  isNewClientDialogOpen,
  setIsNewClientDialogOpen,
}: ClientListHeaderProps) {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-gray-400 mt-1">Gérez vos clients et leurs projets</p>
        </div>
        <Button
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
          onClick={() => setIsNewClientDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau client
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher un client..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 bg-[#101422] rounded-lg w-full text-white"
        />
      </div>
    </div>
  );
}
