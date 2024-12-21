import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductCategoryForm({ open, onOpenChange }: ProductCategoryFormProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Veuillez entrer un nom de catégorie");
      return;
    }
    console.log("Creating category:", categoryName);
    toast.success("Catégorie créée avec succès");
    setCategoryName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle Catégorie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nom de la catégorie"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <Button type="submit">Enregistrer</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}