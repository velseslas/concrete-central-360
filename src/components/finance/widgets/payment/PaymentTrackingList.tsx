import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Payment {
  id: number;
  date: string;
  reference: string;
  amount: number;
  method: string;
  clientName: string;
  projectName: string;
}

interface PaymentTrackingListProps {
  payments: Payment[];
  onViewDetails: () => void;
}

export function PaymentTrackingList({ payments, onViewDetails }: PaymentTrackingListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Derniers Paiements</h3>
        <Button 
          variant="outline" 
          onClick={onViewDetails}
          size="sm"
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          Voir les détails
        </Button>
      </div>

      <div className="space-y-2">
        {payments.slice(0, 3).map((payment) => (
          <div
            key={payment.id}
            className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all cursor-pointer group relative"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-white">
                  {payment.clientName} - {payment.projectName}
                </p>
                <p className="text-xs text-gray-400">
                  {payment.date} - Réf: {payment.reference}
                </p>
              </div>
              <p className="text-lg font-bold text-blue-400">
                {payment.amount.toLocaleString()} DA
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}