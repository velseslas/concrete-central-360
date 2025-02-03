import { UserPlus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ClientListHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isNewClientDialogOpen: boolean;
  setIsNewClientDialogOpen: (open: boolean) => void;
}

export function ClientListHeader({
  searchQuery,
  onSearchChange,
  setIsNewClientDialogOpen,
}: ClientListHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-white flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm">
            <UserPlus className="h-5 w-5 text-purple-400" />
          </div>
          <span className="text-lg font-semibold">Gestion des Clients</span>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Rechercher un client..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 w-full bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button 
            onClick={() => setIsNewClientDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Nouveau client
          </Button>
        </div>
      </div>
    </div>
  );
}