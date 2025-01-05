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
    <div className="bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-3 py-2 text-left">Date</th>
            <th className="border px-3 py-2 text-left">Référence</th>
            <th className="border px-3 py-2 text-right">Montant</th>
            <th className="border px-3 py-2 text-left">Méthode</th>
          </tr>
        </thead>
        <tbody>
          {reportData.payments?.map((payment, index) => (
            <tr key={index}>
              <td className="border px-3 py-2">{payment.date}</td>
              <td className="border px-3 py-2">{payment.reference}</td>
              <td className="border px-3 py-2 text-right">{payment.amount.toLocaleString()} DA</td>
              <td className="border px-3 py-2">{payment.method}</td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-semibold">
            <td colSpan={2} className="border px-3 py-2 text-right">Total</td>
            <td className="border px-3 py-2 text-right">{total.toLocaleString()} DA</td>
            <td className="border px-3 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}