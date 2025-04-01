
import { Button } from "@/components/ui/button";
import { ClientPaymentListItem } from "./ClientPaymentListItem";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ClientPaymentCollapsedListProps {
  payments: Array<{
    id: string;
    client: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    lastPaymentDate: string;
    dueDate: string;
    status: string;
  }>;
  handleRowClick: (payment: any) => void;
  setIsExpanded: (value: boolean) => void;
}

export function ClientPaymentCollapsedList({ 
  payments, 
  handleRowClick, 
  setIsExpanded 
}: ClientPaymentCollapsedListProps) {
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {payments.slice(0, 3).map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ClientPaymentListItem 
              payment={payment}
              handleRowClick={handleRowClick}
            />
          </motion.div>
        ))}
      </div>
      {payments.length > 3 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-primary-300 hover:text-primary-200 hover:bg-primary/10 flex items-center gap-2"
          >
            Voir plus
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
