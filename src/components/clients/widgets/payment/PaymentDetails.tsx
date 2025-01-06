import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface Payment {
  id: number;
  amount: number;
  date: string;
  reference: string;
  document: string;
  paymentMethod: string;
  projectId: string;
}

interface PaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClient?: {
    name: string;
    payments: Payment[];
  };
  onDocumentClick: (document: string) => void;
}

export function PaymentDetails({ 
  open, 
  onOpenChange, 
  selectedClient,
  onDocumentClick 
}: PaymentDetailsProps) {
  if (!selectedClient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Historique des paiements - {selectedClient.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Référence</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-right text-gray-400">Montant</TableHead>
                <TableHead className="text-center text-gray-400">Document</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedClient.payments.map((payment) => (
                <TableRow key={payment.id} className="border-gray-800">
                  <TableCell className="text-gray-300">{payment.reference}</TableCell>
                  <TableCell className="text-gray-300">{payment.date}</TableCell>
                  <TableCell className="text-right text-gray-300">
                    {payment.amount.toLocaleString()} DA
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDocumentClick(payment.document)}
                      className="text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}