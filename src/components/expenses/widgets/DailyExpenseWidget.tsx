import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

export function DailyExpenseWidget() {
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);

  // Mock data for demonstration
  const expenses = [
    {
      id: 1,
      time: "09:15",
      category: "Carburant",
      description: "Plein camion Mercedes",
      amount: 15000,
      trend: "up",
    },
    {
      id: 2,
      time: "11:30",
      category: "Entretien",
      description: "Réparation malaxeur",
      amount: 25000,
      trend: "down",
    },
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const previousDayExpenses = 35000; // Mock data for comparison
  const percentageChange = ((totalExpenses - previousDayExpenses) / previousDayExpenses) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="py-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2 text-xl font-bold">
              <DollarSign className="h-5 w-5 text-red-400" />
              Dépenses du Jour
            </CardTitle>
            <Button 
              onClick={() => setShowNewExpenseForm(true)} 
              size="sm"
              className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle dépense
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4">
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[200px] flex-1">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-red-400" />
                Total du jour
              </h3>
              <p className="text-xl font-bold text-white">{totalExpenses.toLocaleString()} DA</p>
              <div className="flex items-center mt-1">
                {percentageChange > 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-400 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-400 mr-1" />
                )}
                <p className={`text-sm ${percentageChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {Math.abs(percentageChange).toFixed(1)}% par rapport à hier
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            {expenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-red-400" />
                      {expense.category}
                    </h3>
                    <p className="text-gray-400 text-sm">{expense.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {expense.amount.toLocaleString()} DA
                      </p>
                      <p className="text-gray-400 text-sm">{expense.time}</p>
                    </div>
                    {expense.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-red-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}