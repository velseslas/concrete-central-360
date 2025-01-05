import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ExpenseCategoryWidget } from "@/components/expenses/widgets/ExpenseCategoryWidget";
import { DailyExpenseWidget } from "@/components/expenses/widgets/DailyExpenseWidget";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingExpense(null);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    console.log("Widget expanded:", !isExpanded);
  };

  const widgets = [
    {
      id: 'general',
      title: 'Dépenses Générales',
      icon: DollarSign,
      color: 'text-blue-500',
      description: 'Gérer les dépenses générales de l\'entreprise'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 space-y-6"
      >
        <DailyExpenseWidget />
        
        {/* Widget Cliquable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group"
        >
          <Card 
            className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={toggleExpand}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2 text-xl font-bold">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  Dépenses Générales
                </CardTitle>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-white/70" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white/70" />
                )}
              </div>
            </CardHeader>
            {isExpanded && (
              <CardContent>
                <div className="text-white/70">
                  {/* Espace réservé pour les futurs widgets (chantiers, etc.) */}
                  <p>Contenu à venir...</p>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center"
        >
          {!activeWidget && (
            <Button 
              className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-white"
              onClick={() => setIsOpen(true)}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Ajouter une dépense
            </Button>
          )}
        </motion.div>

        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {editingExpense ? "Modifier la dépense" : "Ajouter une dépense"}
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <ExpenseForm
                onClose={handleClose}
                initialData={editingExpense}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </motion.div>
    </div>
  );
};

export default Expenses;
