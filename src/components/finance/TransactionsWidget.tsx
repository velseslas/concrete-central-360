import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign } from "lucide-react";

const mockTransactions = [
  {
    id: "1",
    date: "2024-03-20",
    description: "Paiement Client A",
    type: "Entrée",
    amount: 150000
  },
  {
    id: "2",
    date: "2024-03-21",
    description: "Achat Matériaux",
    type: "Sortie",
    amount: -50000
  },
  {
    id: "3",
    date: "2024-03-22",
    description: "Paiement Client B",
    type: "Entrée",
    amount: 200000
  }
];

export function TransactionsWidget() {
  return (
    <Card className="bg-gray-800/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-100 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-400" />
          Dernières Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Description</TableHead>
              <TableHead className="text-right text-gray-300">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-gray-700">
                <TableCell className="text-gray-300">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-gray-300">{transaction.description}</TableCell>
                <TableCell className={`text-right ${
                  transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.amount.toLocaleString()} DA
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}