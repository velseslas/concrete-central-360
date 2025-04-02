
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ClientSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function ClientSearch({ searchQuery, setSearchQuery }: ClientSearchProps) {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Rechercher un client..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 bg-[#101422] border-[#1F2232] rounded-lg w-full text-white"
      />
    </div>
  );
}
