
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ExpenseForm from "./ExpenseForm";

interface ExpenseDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingExpense: any | null;
  onClose: () => void;
}

export const ExpenseDrawer = ({ 
  isOpen, 
  onOpenChange, 
  editingExpense, 
  onClose 
}: ExpenseDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {editingExpense ? "Modifier la dépense" : "Ajouter une dépense"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ExpenseForm
            onClose={onClose}
            initialData={editingExpense}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
