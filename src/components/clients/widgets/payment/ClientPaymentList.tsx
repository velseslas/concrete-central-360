
import { motion } from "framer-motion";
import { User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientPayment {
  id: string;
  name: string;
  totalPaid: number;
  lastPayment: string;
  payments: Array<{
    id: number;
    amount: number;
    date: string;
    reference: string;
    document: string;
    paymentMethod: string;
    projectId: string;
  }>;
}

interface ClientPaymentListProps {
  clients: ClientPayment[];
  onViewDetails: (client: ClientPayment) => void;
}

export function ClientPaymentList({ clients, onViewDetails }: ClientPaymentListProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {clients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start mb-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{client.name}</h3>
              <div className="flex items-center mt-1 text-gray-400">
                <User className="h-4 w-4 mr-1" />
                <span className="text-sm">Dernier paiement: {client.lastPayment}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold text-blue-400">
              {client.totalPaid.toLocaleString()} DA
            </p>
            <Button 
              variant="ghost" 
              className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
              onClick={() => onViewDetails(client)}
            >
              Voir les détails
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
