import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Car, Settings, Calendar, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

export function RollingStockExpenseWidget() {
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);

  // Mock data for demonstration
  const expenses = [
    {
      id: 1,
      date: "2024-03-15",
      vehicle: "Mercedes Actros - 123 ABC 16",
      type: "Carburant",
      amount: 1500,
    },
    {
      id: 2,
      date: "2024-03-14",
      vehicle: "Volvo FH - 456 DEF 16",
      type: "Entretien",
      amount: 2500,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-[#9b87f5]" />
              <CardTitle className="text-base text-white">Dépenses Parc Roulant</CardTitle>
            </div>
            <Button 
              onClick={() => setShowNewExpenseForm(true)}
              size="sm"
              className="bg-[#9b87f5] hover:bg-[#8b77e5] text-xs transition-colors duration-200"
            >
              <Plus className="mr-1 h-3 w-3" />
              Nouvelle dépense
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 bg-gray-800/50">
                  <TableHead className="text-xs text-[#9b87f5]"><Calendar className="h-3 w-3 inline-block mr-1" />Date</TableHead>
                  <TableHead className="text-xs text-[#9b87f5]"><Car className="h-3 w-3 inline-block mr-1" />Véhicule</TableHead>
                  <TableHead className="text-xs text-[#9b87f5]"><Settings className="h-3 w-3 inline-block mr-1" />Type</TableHead>
                  <TableHead className="text-xs text-[#9b87f5]"><DollarSign className="h-3 w-3 inline-block mr-1" />Montant</TableHead>
                  <TableHead className="text-xs text-[#9b87f5]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <motion.tr
                    key={expense.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-gray-700 bg-gray-800/30 hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <TableCell className="text-xs text-gray-300">{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-xs text-gray-300">{expense.vehicle}</TableCell>
                    <TableCell className="text-xs text-gray-300">{expense.type}</TableCell>
                    <TableCell className="text-xs text-gray-300">{expense.amount.toLocaleString()} DH</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-[#9b87f5]/20 hover:text-[#9b87f5]"
                        >
                          <Settings className="h-3 w-3 text-[#9b87f5]" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}