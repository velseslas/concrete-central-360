
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { PaymentReceiptComponent } from "./PaymentReceiptComponent";
import { toast } from "sonner";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  method: string;
  reference: string;
  receiptId?: string;
}

interface PaymentData {
  id: string;
  clientId: string;
  client: string;
  project: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: string;
  transactions: Transaction[];
}

interface ReceiptData {
  id: string;
  client: string;
  project?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  reference?: string;
}

interface ClientPaymentHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: PaymentData | null;
  onAddPayment?: () => void;
}

export function ClientPaymentHistoryDialog({
  open,
  onOpenChange,
  paymentData,
  onAddPayment
}: ClientPaymentHistoryDialogProps) {
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);

  if (!paymentData) return null;

  const handleViewReceipt = (transaction: Transaction) => {
    setSelectedReceipt({
      id: transaction.id,
      client: paymentData.client,
      project: paymentData.project,
      amount: transaction.amount,
      paymentDate: transaction.date,
      paymentMethod: transaction.method,
      reference: transaction.reference
    });
    setShowReceiptPreview(true);
  };

  const handleExportHistory = () => {
    toast.success("Export de l'historique des paiements en cours...");
    // Implementation would use a library to generate a PDF or Excel file
  };

  const handlePrintHistory = () => {
    window.print();
    toast.success("Impression de l'historique des paiements");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-[900px] overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                Historique des paiements - {paymentData.client}
              </DialogTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gray-800/50 hover:bg-gray-700/60 text-gray-200"
                  onClick={handleExportHistory}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gray-800/50 hover:bg-gray-700/60 text-gray-200"
                  onClick={handlePrintHistory}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Project and Payment Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400">Chantier</p>
                <p className="text-lg font-medium text-white">{paymentData.project}</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-lg font-medium text-white">{paymentData.totalAmount.toLocaleString('fr-FR')} DA</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400">Payé</p>
                <p className="text-lg font-medium text-green-400">{paymentData.paidAmount.toLocaleString('fr-FR')} DA</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400">Reste à payer</p>
                <p className="text-lg font-medium text-amber-400">{paymentData.remainingAmount.toLocaleString('fr-FR')} DA</p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Statut du paiement:</span>
                {paymentData.status === "payé" && (
                  <Badge className="bg-green-500/20 text-green-500">Payé</Badge>
                )}
                {paymentData.status === "partiel" && (
                  <Badge className="bg-amber-500/20 text-amber-500">Payé partiellement</Badge>
                )}
                {paymentData.status === "impayé" && (
                  <Badge className="bg-red-500/20 text-red-500">Impayé</Badge>
                )}
              </div>
              <div className="text-gray-300">
                Échéance: <span className="font-medium">{paymentData.dueDate}</span>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-gray-800/30 rounded-lg overflow-hidden">
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader className="bg-gray-800/80">
                    <TableRow className="border-gray-700 hover:bg-transparent">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Référence</TableHead>
                      <TableHead className="text-gray-300">Méthode</TableHead>
                      <TableHead className="text-right text-gray-300">Montant</TableHead>
                      <TableHead className="text-center text-gray-300">Reçu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.transactions.length > 0 ? (
                      paymentData.transactions.map(transaction => (
                        <TableRow key={transaction.id} className="border-gray-700/50 hover:bg-gray-800/50">
                          <TableCell className="text-gray-200">{transaction.date}</TableCell>
                          <TableCell className="text-gray-200">{transaction.reference}</TableCell>
                          <TableCell className="text-gray-200">{transaction.method}</TableCell>
                          <TableCell className="text-right text-green-400">
                            {transaction.amount.toLocaleString('fr-FR')} DA
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              onClick={() => handleViewReceipt(transaction)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-gray-400">
                          Aucune transaction enregistrée
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            {/* Add Payment Button */}
            <div className="flex justify-end">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={onAddPayment}
              >
                Ajouter un paiement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Preview Dialog */}
      {selectedReceipt && (
        <PaymentReceiptComponent
          open={showReceiptPreview}
          onOpenChange={setShowReceiptPreview}
          receiptData={{
            client: selectedReceipt.client,
            project: selectedReceipt.project,
            amount: selectedReceipt.amount,
            paymentMethod: selectedReceipt.paymentMethod,
            paymentDate: selectedReceipt.paymentDate,
            reference: selectedReceipt.reference
          }}
        />
      )}
    </>
  );
}
