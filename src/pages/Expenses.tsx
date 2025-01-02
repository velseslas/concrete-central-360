import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import { RollingStockExpenseWidget } from "@/components/expenses/widgets/RollingStockExpenseWidget";
import { ConcreteExpenseWidget } from "@/components/expenses/widgets/ConcreteExpenseWidget";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DollarSign, Car, Building2 } from "lucide-react";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Gestion des Dépenses</h1>
        <div className="grid gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle>Dépenses Générales</CardTitle>
                </div>
                <Button onClick={() => setIsOpen(true)} className="hover:scale-105 transition-transform">
                  Ajouter une dépense
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ExpenseList onEdit={handleEdit} />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <CardTitle>Dépenses Parc Roulant</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <RollingStockExpenseWidget />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Dépenses Centrale à Béton</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ConcreteExpenseWidget />
            </CardContent>
          </Card>
        </div>
      </div>

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