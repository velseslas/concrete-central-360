import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const expenseSchema = z.object({
  date: z.string().min(1, "La date est requise"),
  category: z.string().min(1, "La catégorie est requise"),
  amount: z.string().min(1, "Le montant est requis"),
  description: z.string().min(1, "La description est requise"),
  supplier: z.string().min(1, "Le fournisseur est requis"),
});

interface ExpenseFormProps {
  onClose: () => void;
  initialData?: any;
}

const ExpenseForm = ({ onClose, initialData }: ExpenseFormProps) => {
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialData || {
      date: "",
      category: "",
      amount: "",
      description: "",
      supplier: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof expenseSchema>) => {
    try {
      console.log("Submitting expense:", values);
      toast.success(initialData ? "Dépense modifiée" : "Dépense ajoutée");
      onClose();
    } catch (error) {
      console.error("Error submitting expense:", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Énergie, maintenance, transport..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fournisseur</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExpenseForm;