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
    <div className="p-4 bg-white">
      <div className="print-info bg-gray-50 p-3 rounded-lg mb-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-medium">{reportData.client}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Méthode de paiement</p>
            <p className="font-medium">{reportData.paymentMethod || 'Toutes'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date de début</p>
            <p className="font-medium">{reportData.startDate || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date de fin</p>
            <p className="font-medium">{reportData.endDate || '-'}</p>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-2 py-1 text-left">Date</th>
            <th className="border px-2 py-1 text-left">Référence</th>
            <th className="border px-2 py-1 text-right">Montant</th>
            <th className="border px-2 py-1 text-left">Méthode</th>
          </tr>
        </thead>
        <tbody>
          {reportData.payments?.map((payment, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{payment.date}</td>
              <td className="border px-2 py-1">{payment.reference}</td>
              <td className="border px-2 py-1 text-right">{payment.amount.toLocaleString()} DA</td>
              <td className="border px-2 py-1">{payment.method}</td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-semibold">
            <td colSpan={2} className="border px-2 py-1 text-right">Total</td>
            <td className="border px-2 py-1 text-right">{total.toLocaleString()} DA</td>
            <td className="border px-2 py-1"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}