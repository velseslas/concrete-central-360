import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface PaymentHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onNewPayment: () => void;
}

export function PaymentHeader({ searchQuery, setSearchQuery, onNewPayment }: PaymentHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
      <div className="relative flex-grow md:w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Rechercher un paiement..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
        />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onNewPayment}
        className="text-white border-gray-700 hover:bg-gray-700/50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Nouveau Paiement
      </Button>
    </div>
  );
}