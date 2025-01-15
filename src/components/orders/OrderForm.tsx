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
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function OrderForm({ open, onOpenChange, onSubmit }: OrderFormProps) {
  console.log("OrderForm rendered");

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      clientId: "",
      projectId: "",
      deliveryDate: "",
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
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                <ClientProjectFields 
                  form={form} 
                  mockClients={mockClients} 
                  mockProjects={mockProjects} 
                />

                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Date de livraison</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          className="h-12 bg-gray-800/50 border-gray-700/50 text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
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
                          className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
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
              </div>
            </ScrollArea>

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90"
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