import { motion } from "framer-motion";
import { CreditCard, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentListProps {
  clients: Array<{
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
    }>;
  }>;
  onViewDetails: (client: any) => void;
}

export function PaymentList({ clients, onViewDetails }: PaymentListProps) {
  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">{client.name}</h3>
              <p className="text-sm text-white/80">
                Dernier paiement: {client.lastPayment}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold">
                Total: {client.totalPaid.toLocaleString()} DA
              </span>
              <Button 
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white"
                onClick={() => onViewDetails(client)}
              >
                Détails
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}