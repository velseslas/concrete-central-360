import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function ConcreteExpenseWidget() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2024-03-20", description: "Maintenance pompe", amount: 25000 },
    { id: 2, date: "2024-03-19", description: "Réparation malaxeur", amount: 15000 },
    { id: 3, date: "2024-03-18", description: "Pièces de rechange", amount: 8000 },
  ]);

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    toast.success("Dépense supprimée avec succès");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Dépenses Centrale à Béton</h2>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-500/20 text-blue-400"
          onClick={() => toast.info("Ajout de dépense")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle dépense
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {expenses.map((expense) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all duration-300"
            >
              <div>
                <h3 className="font-medium text-white">{expense.description}</h3>
                <p className="text-sm text-gray-400">{new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-400 font-medium">{expense.amount.toLocaleString()} DA</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-blue-500/20 text-blue-400"
                    onClick={() => toast.info("Modification de dépense")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-500/20 text-red-400"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}