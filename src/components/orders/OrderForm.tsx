import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { OrderFormFields } from "./OrderFormFields";
import { OrderFormValues, OrderFormProps, orderSchema, mockClients, mockProjects, mockCategories, mockProducts } from "./types";
import { ClientProjectFields } from "./ClientProjectFields";

export function OrderForm({ open, onOpenChange, onSubmit }: OrderFormProps) {
  console.log("OrderForm rendered");

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      clientId: "",
      projectId: "",
      products: [{ category: "", product: "", quantity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit = (data: OrderFormValues) => {
    console.log("Form submitted:", data);
    onSubmit(data);
    toast.success("Commande créée avec succès");
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900/95 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Nouvelle commande
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <ClientProjectFields 
              form={form} 
              mockClients={mockClients} 
              mockProjects={mockProjects} 
            />

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <OrderFormFields
                      form={form}
                      index={index}
                      mockCategories={mockCategories}
                      mockProducts={mockProducts}
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full mt-2 border-dashed border-gray-700 text-white hover:bg-gray-800"
                onClick={() => append({ category: "", product: "", quantity: "" })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Check className="mr-2 h-4 w-4" />
                Valider
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}