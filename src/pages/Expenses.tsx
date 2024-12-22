import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import { RollingStockExpenseWidget } from "@/components/expenses/widgets/RollingStockExpenseWidget";
import { ConcreteExpenseWidget } from "@/components/expenses/widgets/ConcreteExpenseWidget";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Dépenses Générales</CardTitle>
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                  <DrawerTrigger asChild>
                    <Button>Ajouter une dépense</Button>
                  </DrawerTrigger>
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
            </CardHeader>
            <CardContent>
              <ExpenseList onEdit={handleEdit} />
            </CardContent>
          </Card>

          <RollingStockExpenseWidget />
          <ConcreteExpenseWidget />
        </div>
      </div>
    </div>
  );
};

export default Expenses;