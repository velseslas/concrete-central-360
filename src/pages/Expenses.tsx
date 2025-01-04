import { ConcreteExpenseWidget } from "@/components/expenses/widgets/ConcreteExpenseWidget";
import { RollingStockExpenseWidget } from "@/components/expenses/widgets/RollingStockExpenseWidget";
import { ExpenseCategoryWidget } from "@/components/expenses/widgets/ExpenseCategoryWidget";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const Expenses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="container mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
            Gestion des Dépenses
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6 hover:bg-gray-700/50 transition-all duration-300">
                <ConcreteExpenseWidget />
              </Card>

              <Card className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6 hover:bg-gray-700/50 transition-all duration-300">
                <RollingStockExpenseWidget />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6 hover:bg-gray-700/50 transition-all duration-300 h-full">
                <ExpenseCategoryWidget />
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Expenses;