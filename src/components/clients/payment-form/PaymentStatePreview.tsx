import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PaymentStatePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payments: Array<{
    id: number;
    date: string;
    reference: string;
    amount: number;
    method: string;
    clientName: string;
    projectName: string;
  }>;
  filters: {
    periodType: string;
    startDate: string;
    endDate: string;
    client: string;
    method: string;
  };
}

export function PaymentStatePreview({ 
  open, 
  onOpenChange, 
  payments,
  filters 
}: PaymentStatePreviewProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const total = payments.reduce((sum, payment) => sum + payment.amount, 0);

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>État des Paiements</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px;
              color: #333;
            }
            h1 { 
              color: #2563eb;
              margin-bottom: 20px;
            }
            .header-info {
              margin-bottom: 20px;
              color: #666;
            }
            table { 
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td { 
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th { 
              background-color: #f8f9fa;
              font-weight: bold;
            }
            .amount {
              text-align: right;
            }
            .total-row {
              font-weight: bold;
              background-color: #f8f9fa;
            }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>État des Paiements</h1>
          
          <div class="header-info">
            <p>Période: ${filters.periodType}</p>
            <p>Du: ${filters.startDate || 'N/A'} au ${filters.endDate || 'N/A'}</p>
            <p>Client: ${filters.client || 'Tous les clients'}</p>
            <p>Mode de paiement: ${filters.method || 'Tous les modes'}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Projet</th>
                <th>Référence</th>
                <th class="amount">Montant</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              ${payments.map(payment => `
                <tr>
                  <td>${payment.date}</td>
                  <td>${payment.clientName}</td>
                  <td>${payment.projectName}</td>
                  <td>${payment.reference}</td>
                  <td class="amount">${payment.amount.toLocaleString()} DA</td>
                  <td>${payment.method}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="4" style="text-align: right;">Total:</td>
                <td class="amount">${total.toLocaleString()} DA</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px;">
            Imprimer
          </button>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white border-gray-800">
        <div className="flex justify-end mb-4">
          <Button onClick={handlePrint} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Version imprimable
          </Button>
        </div>
        <div className="bg-white text-gray-900 p-6 rounded-lg">
          <iframe 
            srcDoc={`
              <style>
                body { margin: 0; font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f8f9fa; }
                .amount { text-align: right; }
              </style>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Projet</th>
                    <th>Référence</th>
                    <th class="amount">Montant</th>
                    <th>Mode</th>
                  </tr>
                </thead>
                <tbody>
                  ${payments.map(payment => `
                    <tr>
                      <td>${payment.date}</td>
                      <td>${payment.clientName}</td>
                      <td>${payment.projectName}</td>
                      <td>${payment.reference}</td>
                      <td class="amount">${payment.amount.toLocaleString()} DA</td>
                      <td>${payment.method}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
            className="w-full h-[500px] border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}