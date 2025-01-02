import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface ExpenseCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const expenseTypes = [
  { id: "general", label: "Dépenses Générales" },
  { id: "mechanical", label: "Parc Mécanique" },
  { id: "concrete", label: "Centrale à Béton" }
];

export function ExpenseCategoryForm({ open, onOpenChange }: ExpenseCategoryFormProps) {
  const [categoryName, setCategoryName] = useState("");
  const [expenseType, setExpenseType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Veuillez entrer un nom de catégorie");
      return;
    }
    if (!expenseType) {
      toast.error("Veuillez sélectionner un type de dépense");
      return;
    }
    console.log("Creating category:", { name: categoryName, type: expenseType });
    toast.success("Catégorie créée avec succès");
    setCategoryName("");
    setExpenseType("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle Catégorie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Nom de la catégorie"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Select value={expenseType} onValueChange={setExpenseType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type de dépense" />
              </SelectTrigger>
              <SelectContent>
                {expenseTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}