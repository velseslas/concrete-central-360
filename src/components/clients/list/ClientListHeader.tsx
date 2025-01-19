import { UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ClientForm } from "../ClientForm";

interface ClientListHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isNewClientDialogOpen: boolean;
  setIsNewClientDialogOpen: (open: boolean) => void;
}

export function ClientListHeader({
  searchQuery,
  onSearchChange,
  isNewClientDialogOpen,
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
        <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-white transition-colors"
              onClick={() => setIsNewClientDialogOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Nouveau client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-gray-900/95 border-gray-700/50">
            <ClientForm onSuccess={() => setIsNewClientDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}