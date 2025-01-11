import { Calculator, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";

interface QuoteHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  onCreateClick: () => void;
}

export function QuoteHeader({
  searchQuery,
  setSearchQuery,
  showAdvancedFilters,
  setShowAdvancedFilters,
  onCreateClick
}: QuoteHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <CardTitle className="text-white flex items-center gap-2">
        <Calculator className="h-6 w-6 text-blue-400" />
        Gestion des Devis
      </CardTitle>
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Rechercher un devis..." 
            className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          variant="outline"
          className="bg-gray-800/50 hover:bg-gray-700/50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres avancés
        </Button>
        <Button 
          onClick={onCreateClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          Nouveau Devis
        </Button>
      </div>
    </div>
  );
}