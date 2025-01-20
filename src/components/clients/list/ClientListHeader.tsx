import { UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="text-white flex items-center gap-2">
        <UserPlus className="h-6 w-6 text-purple-400" />
        Liste des Clients
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Rechercher un client..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400"
          />
        </div>
        <DialogTrigger asChild onClick={() => setIsNewClientDialogOpen(true)}>
          <Button 
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Nouveau client
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
}