
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SupplierPaymentTableProps {
  payments: Array<{
    id: string;
    supplier: string;
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

export function SupplierPaymentTable({ 
  payments, 
  handleRowClick, 
  setIsExpanded 
}: SupplierPaymentTableProps) {
  
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

  return (
    <div className="mt-6">
      <Table>
        <TableHeader className="bg-gray-800/50">
          <TableRow className="hover:bg-gray-700/50 border-gray-700">
            <TableHead className="text-gray-300">Fournisseur</TableHead>
            <TableHead className="text-gray-300 text-right">Montant total</TableHead>
            <TableHead className="text-gray-300 text-right">Payé</TableHead>
            <TableHead className="text-gray-300 text-right">Reste</TableHead>
            <TableHead className="text-gray-300 text-center">Statut</TableHead>
            <TableHead className="text-gray-300 text-right">Échéance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow 
              key={payment.id} 
              className="hover:bg-gray-700/50 border-gray-700 cursor-pointer"
              onClick={() => handleRowClick(payment)}
            >
              <TableCell className="font-medium text-gray-200">{payment.supplier}</TableCell>
              <TableCell className="text-right text-gray-300">{payment.totalAmount.toLocaleString('fr-FR')}</TableCell>
              <TableCell className="text-right text-green-400">{payment.paidAmount.toLocaleString('fr-FR')}</TableCell>
              <TableCell className="text-right text-amber-400">{payment.remainingAmount.toLocaleString('fr-FR')}</TableCell>
              <TableCell className="text-center">{getStatusBadge(payment.status)}</TableCell>
              <TableCell className="text-right text-gray-300">{payment.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-300"
        >
          Voir moins
        </Button>
      </div>
    </div>
  );
}
