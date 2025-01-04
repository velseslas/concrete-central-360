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
              @page {
                size: landscape;
                margin: 15mm;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 100%;
                margin: 0 auto;
                padding: 20px;
              }
              .print-info {
                background-color: #f9fafb;
                border-radius: 4px;
                padding: 12px;
                margin-bottom: 24px;
              }
              .info-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
              }
              .info-item {
                margin-bottom: 8px;
              }
              .info-label {
                color: #6b7280;
                font-size: 0.875rem;
                margin-bottom: 4px;
              }
              .info-value {
                font-weight: 500;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 16px;
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
                body {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="print-info">
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Client</div>
                    <div class="info-value">${reportData.client}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Méthode de paiement</div>
                    <div class="info-value">${reportData.paymentMethod || 'Toutes'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Date de début</div>
                    <div class="info-value">${reportData.startDate || '-'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Date de fin</div>
                    <div class="info-value">${reportData.endDate || '-'}</div>
                  </div>
                </div>
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
            </div>
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none overflow-hidden">
        <PrintablePaymentReport reportData={reportData} />
      </DialogContent>
    </Dialog>
  );
}