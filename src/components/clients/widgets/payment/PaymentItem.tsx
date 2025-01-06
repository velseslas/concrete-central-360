import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PaymentItemProps {
  client: {
    id: string;
    name: string;
    lastPayment: string;
  };
  onViewDetails: (client: any) => void;
}

export function PaymentItem({ client, onViewDetails }: PaymentItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetails(client)}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-white font-medium flex items-center gap-2">
            {client.name}
          </h3>
          <p className="text-gray-400 text-sm">
            Dernier paiement: {client.lastPayment}
          </p>
        </div>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 relative ml-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Edit button clicked");
                  }}
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
  );
}