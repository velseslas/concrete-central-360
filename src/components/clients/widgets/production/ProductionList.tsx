
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Production } from "./types";
import { Factory, Calendar } from "lucide-react";

interface ProductionListProps {
  productions: Production[];
}

export function ProductionList({ productions }: ProductionListProps) {
  const getStatusBadge = (status: Production["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-400" },
      in_progress: { label: "En cours", className: "bg-blue-500/20 text-blue-400" },
      completed: { label: "Terminée", className: "bg-green-500/20 text-green-400" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {productions.map((production, index) => (
        <motion.div
          key={production.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start mb-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
              <Factory className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Commande #{production.order_id}</h3>
              <p className="text-sm text-gray-400 mt-1">{production.formulation}</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-300">Client: {production.client}</p>
            <p className="text-sm text-gray-300">Projet: {production.project}</p>
            <p className="text-sm text-gray-300">Volume: {production.volume} m³</p>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="h-4 w-4 text-gray-400" />
              {new Date(production.start_date).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex justify-end">
            {getStatusBadge(production.status)}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
