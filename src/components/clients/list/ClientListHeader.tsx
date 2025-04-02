
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ClientListHeaderProps {
  setIsNewClientDialogOpen: (open: boolean) => void;
}

export function ClientListHeader({ setIsNewClientDialogOpen }: ClientListHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clients</h1>
        <p className="text-gray-400">Gérez vos clients et leurs projets</p>
      </div>
      <Button 
        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2"
        onClick={() => setIsNewClientDialogOpen(true)}
      >
        <Plus className="h-5 w-5" />
        Nouveau client
      </Button>
    </div>
  );
}
