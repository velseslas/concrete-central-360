import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => onViewDetails(client)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modifier les paiements</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}