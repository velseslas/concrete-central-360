import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DollarSign, Car, Building2 } from "lucide-react";

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
      id: 'general',
      title: 'Dépenses Générales',
      icon: DollarSign,
      color: 'text-blue-500',
      description: 'Gérer les dépenses générales de l\'entreprise'
    },
    {
      id: 'vehicles',
      title: 'Dépenses Parc Roulant',
      icon: Car,
      color: 'text-green-500',
      description: 'Gérer les dépenses liées aux véhicules'
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
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Retour
            </button>
            <h2 className="text-2xl font-bold">{widget.title}</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{widget.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseList onEdit={handleEdit} category={widget.id} />
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => {
          const IconComponent = widget.icon;
          return (
            <Card
              key={widget.id}
              className="cursor-pointer hover:shadow-lg transition-shadow hover:scale-105 transition-all duration-200"
              onClick={() => setActiveWidget(widget.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className={`h-6 w-6 ${widget.color}`} />
                  {widget.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{widget.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Dépenses</h1>
        {!activeWidget && (
          <Button onClick={() => setIsOpen(true)} className="hover:scale-105 transition-transform">
            <DollarSign className="mr-2 h-4 w-4" />
            Ajouter une dépense
          </Button>
        )}
      </div>

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
    </div>
  );
};

export default Expenses;