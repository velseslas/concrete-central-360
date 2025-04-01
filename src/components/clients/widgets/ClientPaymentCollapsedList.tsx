
import { Button } from "@/components/ui/button";
import { ClientPaymentListItem } from "./ClientPaymentListItem";
import { ChevronDown } from "lucide-react";

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
      <div className="space-y-3 mt-4">
        {payments.slice(0, 2).map((payment) => (
          <ClientPaymentListItem 
            key={payment.id}
            payment={payment}
            handleRowClick={handleRowClick}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="text-primary-300 hover:text-primary-200 hover:bg-primary/10 flex items-center gap-1"
        >
          Voir plus
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
