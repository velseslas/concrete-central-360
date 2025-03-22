
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { SupplierPaymentDetails } from "../forms/SupplierPaymentDetails";

interface SupplierPaymentListItemProps {
  payment: {
    id: string;
    supplier: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    lastPaymentDate: string;
    dueDate: string;
    status: string;
  };
  handleRowClick: (payment: any) => void;
}

export function SupplierPaymentListItem({ payment, handleRowClick }: SupplierPaymentListItemProps) {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [supplierForDetails, setSupplierForDetails] = useState<{id: string, name: string} | null>(null);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "payé":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20">Payé</Badge>;
      case "partiel":
        return <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500/20">Partiel</Badge>;
      case "impayé":
        return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/20">Impayé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleItemClick = () => {
    setSupplierForDetails({
      id: payment.id,
      name: payment.supplier
    });
    setShowPaymentDetails(true);
  };

  return (
    <>
      <div 
        key={payment.id}
        className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 flex justify-between items-center group hover:bg-gray-700/30 transition-colors cursor-pointer"
        onClick={handleItemClick}
      >
        <div>
          <p className="text-sm font-medium text-gray-200">{payment.supplier}</p>
          <p className="text-xs text-gray-400">Échéance: {payment.dueDate}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-amber-400">
            {payment.remainingAmount.toLocaleString('fr-FR')} DA
          </span>
          {getStatusBadge(payment.status)}
        </div>
      </div>

      <SupplierPaymentDetails
        open={showPaymentDetails}
        onOpenChange={setShowPaymentDetails}
        supplier={supplierForDetails}
      />
    </>
  );
}
