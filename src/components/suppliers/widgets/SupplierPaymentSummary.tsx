
import { DollarSign, Calculator } from "lucide-react";

interface SupplierPaymentSummaryProps {
  totalDue: number;
  urgentDue: number;
}

export function SupplierPaymentSummary({ totalDue, urgentDue }: SupplierPaymentSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 group hover:bg-gray-700/30 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-400">Total à payer</p>
          <DollarSign className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
        </div>
        <p className="text-xl font-bold text-white">{totalDue.toLocaleString('fr-FR')} DA</p>
      </div>
      <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 group hover:bg-gray-700/30 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-400">Urgent (7 jours)</p>
          <Calculator className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
        </div>
        <p className="text-xl font-bold text-red-400">{urgentDue.toLocaleString('fr-FR')} DA</p>
      </div>
    </div>
  );
}
