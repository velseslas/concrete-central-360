import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Nouvelle Catégorie
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nom de la catégorie"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-gray-300 placeholder-gray-500"
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Enregistrer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}