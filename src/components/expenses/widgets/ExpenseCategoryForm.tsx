import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ExpenseCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, type: string) => void;
  initialData?: {
    name: string;
    type: string;
  } | null;
}

const expenseTypes = [
  { id: "general", label: "Dépenses Générales" },
  { id: "mechanical", label: "Parc Mécanique" },
  { id: "concrete", label: "Centrale à Béton" }
];

export function ExpenseCategoryForm({ 
  open, 
  onOpenChange, 
  onSubmit,
  initialData 
}: ExpenseCategoryFormProps) {
  const [categoryName, setCategoryName] = useState("");
  const [expenseType, setExpenseType] = useState("");

  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.name);
      setExpenseType(initialData.type);
    } else {
      setCategoryName("");
      setExpenseType("");
    }
  }, [initialData, open]);

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

    onSubmit(categoryName, expenseType);
    setCategoryName("");
    setExpenseType("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Modifier la Catégorie" : "Nouvelle Catégorie"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Nom de la catégorie"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Select value={expenseType} onValueChange={setExpenseType}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Sélectionner le type de dépense" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900/95 border-white/10">
                {expenseTypes.map((type) => (
                  <SelectItem 
                    key={type.id} 
                    value={type.id}
                    className="text-white hover:bg-white/10"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {initialData ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}