
import { Button } from "@/components/ui/button";
import { ClientPaymentListItem } from "./ClientPaymentListItem";

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
          className="text-gray-400 hover:text-gray-300"
        >
          Voir plus
        </Button>
      </div>
    </div>
  );
}
