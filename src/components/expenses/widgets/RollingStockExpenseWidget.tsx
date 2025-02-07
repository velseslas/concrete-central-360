
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Car, Settings } from "lucide-react";
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
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-gray-900 to-[#1A1F2C] border-[#9b87f5]/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <Car className="h-5 w-5 text-[#9b87f5]" />
            Dépenses Parc Roulant
          </CardTitle>
          <Button 
            onClick={() => setShowNewExpenseForm(true)} 
            size="sm"
            className="bg-[#9b87f5]/20 backdrop-blur-lg border border-[#9b87f5]/30 hover:bg-[#9b87f5]/30 hover:border-[#9b87f5]/40 transition-all duration-300 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle dépense
          </Button>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            {expenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-[#1A1F2C]/50 backdrop-blur-sm border border-[#9b87f5]/20 hover:border-[#9b87f5]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#9b87f5]" />
                      {expense.vehicle}
                    </h3>
                    <p className="text-gray-400 text-sm">{expense.type}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {expense.amount.toLocaleString()} DA
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-[#9b87f5]/20"
                    >
                      <Settings className="h-4 w-4 text-[#9b87f5]" />
                    </Button>
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
