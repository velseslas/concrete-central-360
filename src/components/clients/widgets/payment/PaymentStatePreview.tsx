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
        <!DOCTYPE html>
        <html>
          <head>
            <title>État des paiements</title>
            <style>
              body {
                margin: 20px;
                font-family: Arial, sans-serif;
                background: white;
                color: black;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td {
                padding: 12px;
                text-align: left;
                border: 1px solid #ddd;
              }
              th {
                background-color: #f8f9fa;
                font-weight: bold;
              }
              .text-right {
                text-align: right;
              }
              .total-row {
                background-color: #f8f9fa;
                font-weight: bold;
              }
              .header {
                margin-bottom: 20px;
              }
              .header h1 {
                color: #1a1a1a;
                font-size: 24px;
                margin-bottom: 10px;
              }
              .header p {
                color: #666;
                margin: 5px 0;
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                table {
                  page-break-inside: auto;
                }
                tr {
                  page-break-inside: avoid;
                  page-break-after: auto;
                }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>État des paiements</h1>
              <p>Client: ${reportData.client}</p>
              <p>Période: du ${reportData.startDate} au ${reportData.endDate}</p>
              ${reportData.paymentMethod ? `<p>Méthode de paiement: ${reportData.paymentMethod}</p>` : ''}
            </div>
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
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none">
        <div className="print-preview cursor-pointer" onClick={handlePrint}>
          <PrintablePaymentReport reportData={reportData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}