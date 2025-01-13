import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const productionSchema = z.object({
  orderId: z.string().min(1, "La commande est requise"),
  volume: z.string().min(1, "Le volume est requis"),
  notes: z.string().optional(),
});

type ProductionFormData = z.infer<typeof productionSchema>;

interface ProductionFormFieldsProps {
  form: UseFormReturn<ProductionFormData>;
  orders: any[];
}

export function ProductionFormFields({ form, orders }: ProductionFormFieldsProps) {
  return (
    <>
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
    </>
  );
}

export { productionSchema };
export type { ProductionFormData };