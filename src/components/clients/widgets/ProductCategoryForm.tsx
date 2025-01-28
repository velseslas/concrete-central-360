import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
});

interface ProductCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryToEdit?: z.infer<typeof formSchema>;
}

export function ProductCategoryForm({ open, onOpenChange, categoryToEdit }: ProductCategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: categoryToEdit || {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Category data:", data);
    toast.success(categoryToEdit ? "Catégorie modifiée" : "Catégorie créée");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {categoryToEdit ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Nom</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nom de la catégorie" 
                      {...field}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Description de la catégorie" 
                      {...field}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700/50">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                type="button"
                className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {categoryToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}