import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProductionFormFields, productionSchema, type ProductionFormData } from "./production/ProductionFormFields";

interface ProductionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ProductionForm({ open, onOpenChange, onSuccess }: ProductionFormProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      orderId: "",
      volume: "",
      notes: "",
    },
  });

  const fetchOrders = async () => {
    console.log("Fetching orders...");
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "pending");

    if (error) {
      console.error("Error fetching orders:", error);
      toast.error("Erreur lors du chargement des commandes");
      return;
    }

    console.log("Orders fetched:", data);
    setOrders(data || []);
  };

  const onSubmit = async (values: ProductionFormData) => {
    console.log("Submitting production:", values);
    setLoading(true);
    const selectedOrder = orders.find(order => order.id === values.orderId);

    if (!selectedOrder) {
      toast.error("Commande non trouvée");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("productions")
      .insert({
        order_id: values.orderId,
        formulation: selectedOrder.formulation,
        volume: Number(values.volume),
        client: selectedOrder.client,
        project: selectedOrder.project,
        notes: values.notes,
        start_date: new Date().toISOString(),
        status: "pending"
      });

    if (error) {
      console.error("Error creating production:", error);
      toast.error("Erreur lors de la création de la production");
      setLoading(false);
      return;
    }

    // Update order status
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "in_progress" })
      .eq("id", values.orderId);

    if (updateError) {
      console.error("Error updating order status:", updateError);
      toast.error("Erreur lors de la mise à jour du statut de la commande");
    }

    console.log("Production created successfully");
    toast.success("Production créée avec succès");
    setLoading(false);
    onOpenChange(false);
    form.reset();
    onSuccess?.();
  };

  useEffect(() => {
    if (open) {
      fetchOrders();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900/95 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Nouvelle Production
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProductionFormFields form={form} orders={orders} />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                {loading ? "Création..." : "Créer la production"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}