import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const formulationSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  resistance: z.string().min(1, "La résistance est requise"),
  ciment: z.string().min(1, "Le dosage en ciment est requis"),
  sable: z.string().min(1, "Le dosage en sable est requis"),
  gravier: z.string().min(1, "Le dosage en gravier est requis"),
  eau: z.string().min(1, "Le dosage en eau est requis"),
});

type FormulationFormValues = z.infer<typeof formulationSchema>;

interface FormulationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormulationFormValues) => void;
}

export function FormulationForm({ open, onOpenChange, onSubmit }: FormulationFormProps) {
  const form = useForm<FormulationFormValues>({
    resolver: zodResolver(formulationSchema),
    defaultValues: {
      nom: "",
      resistance: "",
      ciment: "",
      sable: "",
      gravier: "",
      eau: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle formulation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="B25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résistance (MPa)</FormLabel>
                  <FormControl>
                    <Input placeholder="25 MPa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ciment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciment (kg/m³)</FormLabel>
                  <FormControl>
                    <Input placeholder="350 kg/m³" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sable (kg/m³)</FormLabel>
                  <FormControl>
                    <Input placeholder="800 kg/m³" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gravier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gravier (kg/m³)</FormLabel>
                  <FormControl>
                    <Input placeholder="1050 kg/m³" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eau"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eau (L/m³)</FormLabel>
                  <FormControl>
                    <Input placeholder="175 L/m³" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
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