import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const productionSchema = z.object({
  orderId: z.string().min(1, "La commande est requise"),
  volume: z.string().min(1, "Le volume est requis"),
  notes: z.string().optional(),
});

interface ProductionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductionForm({ open, onOpenChange }: ProductionFormProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof productionSchema>>({
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

  const onSubmit = async (values: z.infer<typeof productionSchema>) => {
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
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Commande</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                        <SelectValue placeholder="Sélectionner une commande" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {orders.map((order) => (
                        <SelectItem key={order.id} value={order.id}>
                          {`${order.id} - ${order.client} - ${order.formulation} (${order.volume}m³)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Volume (m³)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="bg-gray-800/50 border-gray-700/50 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="bg-gray-800/50 border-gray-700/50 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

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