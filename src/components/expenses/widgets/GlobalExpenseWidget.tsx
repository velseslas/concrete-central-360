
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExpenseList from "../ExpenseList";
import { GeneralExpenseStatsWidget } from "./GeneralExpenseStatsWidget";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ExpenseForm from "../ExpenseForm";

export function GlobalExpenseWidget() {
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
    <div className="space-y-6">
      <GeneralExpenseStatsWidget />
      
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-gray-900 to-[#1A1F2C] border-[#9b87f5]/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Liste des Dépenses</CardTitle>
            <Button onClick={() => setIsOpen(true)} className="bg-[#9b87f5] hover:bg-[#7E69AB]">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle dépense
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ExpenseList onEdit={handleEdit} category="general" />
        </CardContent>
      </Card>

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
}
