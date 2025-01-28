import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CategoryFormFields } from "../category/CategoryFormFields";
import { CategoryFormValues, categorySchema } from "../category/types";

interface ProductCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryToEdit?: CategoryFormValues;
}

export function ProductCategoryForm({ open, onOpenChange, categoryToEdit }: ProductCategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryToEdit || {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    console.log("Category data:", data);
    toast.success(categoryToEdit ? "Catégorie modifiée" : "Catégorie créée");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700/30 shadow-xl backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {categoryToEdit ? "Modifier la catégorie" : "Nouvelle catégorie"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <CategoryFormFields form={form} />
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700/30">
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-gray-200 hover:text-white transition-colors"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300"
                >
                  {categoryToEdit ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}