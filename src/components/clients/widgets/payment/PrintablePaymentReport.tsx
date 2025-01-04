import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PrintablePaymentReportProps {
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

export function PrintablePaymentReport({ reportData }: PrintablePaymentReportProps) {
  const total = reportData.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

  return (
    <div className="p-8 bg-white">
      <style>
        {`
          @media print {
            @page {
              size: landscape;
              margin: 10mm;
            }
            body {
              width: 100%;
              height: 100%;
            }
            .print-header {
              margin-bottom: 1rem !important;
            }
            .print-info {
              padding: 0.75rem !important;
              margin-bottom: 1rem !important;
            }
            td, th {
              padding: 0.5rem !important;
              font-size: 0.875rem !important;
            }
          }
        `}
      </style>

      <div className="print-header border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold">État des Paiements</h1>
      </div>

      <div className="print-info bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-medium">{reportData.client}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mode de paiement</p>
            <p className="font-medium">{reportData.paymentMethod}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Période</p>
            <p className="font-medium">Du {reportData.startDate} au {reportData.endDate}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Référence</TableHead>
              <TableHead className="font-semibold">Mode</TableHead>
              <TableHead className="text-right font-semibold">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.payments?.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell className="text-right">{payment.amount.toLocaleString()} DA</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-50">
              <TableCell colSpan={3} className="font-bold text-right">Total:</TableCell>
              <TableCell className="text-right font-bold">{total.toLocaleString()} DA</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}