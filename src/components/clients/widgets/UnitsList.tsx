
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Ruler } from "lucide-react";

interface Unit {
  id: number;
  name: string;
  symbol: string;
}

const mockUnits: Unit[] = [
  {
    id: 1,
    name: "Mètre cube",
    symbol: "m³",
  },
  {
    id: 2,
    name: "Heure",
    symbol: "h",
  },
];

export function UnitsList() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {mockUnits.map((unit, index) => (
        <motion.div
          key={unit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start">
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
                <Ruler className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{unit.name}</h3>
                <div className="text-sm px-2 py-1 rounded-full bg-[#1F2232] text-gray-300 mt-1 inline-block">
                  {unit.symbol}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#7C3AED]">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
