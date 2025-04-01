
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Building2 } from "lucide-react";

interface BusinessType {
  id: number;
  name: string;
  description: string;
}

const mockBusinessTypes: BusinessType[] = [
  {
    id: 1,
    name: "SARL",
    description: "Société à responsabilité limitée",
  },
  {
    id: 2,
    name: "EURL",
    description: "Entreprise unipersonnelle à responsabilité limitée",
  },
];

export function BusinessTypeList() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {mockBusinessTypes.map((type, index) => (
        <motion.div
          key={type.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start">
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{type.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{type.description}</p>
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
