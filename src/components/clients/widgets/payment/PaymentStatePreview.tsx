import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PrintablePaymentReport } from "./PrintablePaymentReport";

interface PaymentStatePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportData: {
    client: string;
    startDate: string;
    endDate: string;
    paymentMethod: string;
    payments: Array<{
      date: string;
      reference: string;
      amount: number;
      method: string;
    }>;
  };
}

export function PaymentStatePreview({ open, onOpenChange, reportData }: PaymentStatePreviewProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 0;
                font-size: 0.875rem;
              }
              th, td {
                border: 1px solid #e5e7eb;
                padding: 8px 12px;
                text-align: left;
              }
              th {
                background-color: #f9fafb;
                font-weight: 600;
              }
              .text-right {
                text-align: right;
              }
              .total-row {
                background-color: #f9fafb;
                font-weight: 600;
              }
              @media print {
                @page {
                  size: landscape;
                  margin: 0;
                }
                body {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
            </style>
          </head>
          <body>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Référence</th>
                  <th class="text-right">Montant</th>
                  <th>Méthode</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.payments?.map(payment => `
                  <tr>
                    <td>${payment.date}</td>
                    <td>${payment.reference}</td>
                    <td class="text-right">${payment.amount.toLocaleString()} DA</td>
                    <td>${payment.method}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td colspan="2" class="text-right">Total</td>
                  <td class="text-right">${reportData.payments?.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()} DA</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none">
        <div className="print-preview" onClick={handlePrint}>
          <PrintablePaymentReport reportData={reportData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}