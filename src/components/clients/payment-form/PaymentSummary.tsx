import { Button } from "@/components/ui/button";

interface PaymentSummaryProps {
  totalAmount: number;
  onShowDetails: () => void;
}

export function PaymentSummary({ totalAmount, onShowDetails }: PaymentSummaryProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-4 px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Total:</span>
        <span className="text-lg font-semibold text-blue-400">
          {totalAmount.toLocaleString()} DA
        </span>
      </div>
      <Button 
        variant="outline" 
        onClick={onShowDetails}
        size="sm"
        className="hover:bg-gray-700 hover:text-white transition-colors"
      >
        Voir les détails
      </Button>
    </div>
  );
}