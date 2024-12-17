import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Dépenses</h1>
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

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Liste des Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseList onEdit={handleEdit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Expenses;