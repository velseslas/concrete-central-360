interface ReportTemplateProps {
  filters: {
    clientId: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export function ReportTemplate({ filters }: ReportTemplateProps) {
  // Mock data for demonstration
  const reportData = {
    transactions: [
      {
        date: "2024-03-20",
        reference: "FAC-001",
        amount: 150000,
        status: "Payé"
      },
      {
        date: "2024-03-19",
        reference: "FAC-002",
        amount: 75000,
        status: "En attente"
      }
    ]
  };

  const total = reportData.transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="text-center border-b pb-4">
        <h2 className="text-2xl font-bold">Rapport Financier</h2>
        <p className="text-gray-600">Période: {filters.startDate} - {filters.endDate}</p>
      </div>

      <div className="space-y-2">
        <p><span className="font-semibold">Client:</span> {filters.clientId}</p>
        <p><span className="font-semibold">Statut:</span> {filters.status}</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Référence</th>
            <th className="border px-4 py-2 text-right">Montant</th>
            <th className="border px-4 py-2 text-left">Statut</th>
          </tr>
        </thead>
        <tbody>
          {reportData.transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{transaction.date}</td>
              <td className="border px-4 py-2">{transaction.reference}</td>
              <td className="border px-4 py-2 text-right">{transaction.amount.toLocaleString()} DA</td>
              <td className="border px-4 py-2">{transaction.status}</td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-bold">
            <td colSpan={2} className="border px-4 py-2 text-right">Total:</td>
            <td className="border px-4 py-2 text-right">{total.toLocaleString()} DA</td>
            <td className="border px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}