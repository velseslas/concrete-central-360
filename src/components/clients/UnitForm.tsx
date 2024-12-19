import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const unitSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  symbol: z.string().min(1, "Le symbole est requis"),
});

type UnitFormValues = z.infer<typeof unitSchema>;

interface UnitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UnitForm({ open, onOpenChange }: UnitFormProps) {
  const form = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: "",
      symbol: "",
    },
  });

  const onSubmit = (data: UnitFormValues) => {
    console.log("Unit data:", data);
    toast.success("Unité ajoutée avec succès");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle unité</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'unité" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbole</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: m³, kg, l" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">Créer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}