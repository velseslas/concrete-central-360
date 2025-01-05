import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, Car, Building2, Globe, ListFilter } from "lucide-react";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ExpenseCategoryWidget } from "@/components/expenses/widgets/ExpenseCategoryWidget";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingExpense(null);
  };

  const widgets = [
    {
      id: 'global',
      title: 'Globale',
      icon: Globe,
      color: 'text-purple-500',
      description: 'Vue globale des dépenses'
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: ListFilter,
      color: 'text-yellow-500',
      description: 'Gestion des catégories de dépenses'
    },
    {
      id: 'general',
      title: 'Dépenses Générales',
      icon: DollarSign,
      color: 'text-blue-500',
      description: 'Gérer les dépenses générales de l\'entreprise'
    },
    {
      id: 'mechanical',
      title: 'Dépenses Parc Mécanique',
      icon: Car,
      color: 'text-green-500',
      description: 'Gérer les dépenses liées au parc mécanique'
    },
    {
      id: 'concrete',
      title: 'Dépenses Centrale à Béton',
      icon: Building2,
      color: 'text-orange-500',
      description: 'Gérer les dépenses de la centrale à béton'
    }
  ];

  const renderContent = () => {
    if (activeWidget) {
      const widget = widgets.find(w => w.id === activeWidget);
      if (!widget) return null;

      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveWidget(null)}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              ← Retour
            </button>
            <h2 className="text-2xl font-bold text-white">{widget.title}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="backdrop-blur-lg bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">{widget.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ExpenseList onEdit={handleEdit} category={widget.id} />
                </CardContent>
              </Card>
            </div>
            <div>
              <ExpenseCategoryWidget />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => {
            const IconComponent = widget.icon;
            return (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="cursor-pointer backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setActiveWidget(widget.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <IconComponent className={`h-6 w-6 ${widget.color}`} />
                      {widget.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">{widget.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <div className="lg:col-span-1">
          <ExpenseCategoryWidget />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 space-y-6"
      >
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

        {renderContent()}

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