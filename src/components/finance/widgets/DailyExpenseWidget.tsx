import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const mockDailyExpenses = [
  {
    id: 1,
    date: "2024-02-20",
    category: "Matériaux",
    amount: 1500,
    description: "Achat de ciment",
    supplier: "Fournisseur A",
  },
  {
    id: 2,
    date: "2024-02-20",
    category: "Transport",
    amount: 2000,
    description: "Carburant",
    supplier: "Station B",
  },
  {
    id: 3,
    date: "2024-02-20",
    category: "Maintenance",
    amount: 500,
    description: "Réparation machine",
    supplier: "Service C",
  },
];

export function DailyExpenseWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Dépenses du Jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Catégorie</TableHead>
                <TableHead className="text-gray-300">Montant</TableHead>
                <TableHead className="text-gray-300">Fournisseur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDailyExpenses.map((expense) => (
                <TableRow key={expense.id} className="border-gray-800">
                  <TableCell className="text-gray-300">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-300">{expense.category}</TableCell>
                  <TableCell className="text-gray-300">{expense.amount} DA</TableCell>
                  <TableCell className="text-gray-300">{expense.supplier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}