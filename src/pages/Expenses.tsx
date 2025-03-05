
import { useState } from "react";
import { motion } from "framer-motion";
import { ExpenseWidgetGrid } from "@/components/expenses/ExpenseWidgetGrid";
import { ExpenseWidgetContent } from "@/components/expenses/ExpenseWidgetContent";
import { ExpenseDrawer } from "@/components/expenses/ExpenseDrawer";

const Expenses = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingExpense(null);
  };

  const handleOpenDrawer = () => {
    setEditingExpense(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 space-y-6"
      >
        {activeWidget ? (
          <ExpenseWidgetContent 
            activeWidget={activeWidget}
            onGoBack={() => setActiveWidget(null)}
            onOpenDrawer={handleOpenDrawer}
          />
        ) : (
          <ExpenseWidgetGrid onSelectWidget={setActiveWidget} />
        )}

        <ExpenseDrawer 
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          editingExpense={editingExpense}
          onClose={handleCloseDrawer}
        />
      </motion.div>
    </div>
  );
};

export default Expenses;
