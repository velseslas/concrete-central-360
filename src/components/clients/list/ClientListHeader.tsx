
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
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher un client..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 bg-gray-800/40 border-none shadow-inner rounded-lg w-full text-white focus:ring-2 focus:ring-violet-500 transition-all"
        />
      </div>
      <Button
        className="bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-md hover:shadow-lg transition-all w-full md:w-auto"
        onClick={() => setIsNewClientDialogOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Nouveau client
      </Button>
    </div>
  );
}
