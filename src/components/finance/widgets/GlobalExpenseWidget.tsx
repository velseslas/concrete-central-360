import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const mockGlobalExpenses = [
  {
    id: 1,
    date: "2024-02-20",
    category: "Matériaux",
    amount: 15000,
    description: "Achat de ciment",
    supplier: "Fournisseur A",
  },
  {
    id: 2,
    date: "2024-02-20",
    category: "Transport",
    amount: 8000,
    description: "Carburant",
    supplier: "Station B",
  },
  {
    id: 3,
    date: "2024-02-20",
    category: "Maintenance",
    amount: 12000,
    description: "Réparation machine",
    supplier: "Service C",
  },
];

export function GlobalExpenseWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-400" />
            Dépenses Globales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md">
              <p className="text-gray-300 text-sm">Total Dépenses</p>
              <p className="text-2xl font-bold text-white">35,000 DA</p>
            </div>
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md">
              <p className="text-gray-300 text-sm">Moyenne/Jour</p>
              <p className="text-2xl font-bold text-white">11,666 DA</p>
            </div>
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md">
              <p className="text-gray-300 text-sm">Transactions</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
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
              {mockGlobalExpenses.map((expense) => (
                <TableRow key={expense.id} className="border-gray-800 hover:bg-white/5 transition-colors">
                  <TableCell className="text-gray-300">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-300">{expense.category}</TableCell>
                  <TableCell className="text-gray-300">{expense.amount.toLocaleString()} DA</TableCell>
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