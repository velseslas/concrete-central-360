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
  // Sables
  sable01: z.string().min(1, "Le dosage en sable 0/1 est requis"),
  sable03: z.string().min(1, "Le dosage en sable 0/3 est requis"),
  sable04: z.string().min(1, "Le dosage en sable 0/4 est requis"),
  // Graviers
  gravier38: z.string().min(1, "Le dosage en gravier 3/8 est requis"),
  gravier815: z.string().min(1, "Le dosage en gravier 8/15 est requis"),
  gravier1525: z.string().min(1, "Le dosage en gravier 15/25 est requis"),
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
      sable01: "",
      sable03: "",
      sable04: "",
      gravier38: "",
      gravier815: "",
      gravier1525: "",
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
            <div className="space-y-4">
              <h3 className="font-medium">Sables</h3>
              <FormField
                control={form.control}
                name="sable01"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sable 0/1 (kg/m³)</FormLabel>
                    <FormControl>
                      <Input placeholder="200 kg/m³" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sable03"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sable 0/3 (kg/m³)</FormLabel>
                    <FormControl>
                      <Input placeholder="300 kg/m³" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sable04"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sable 0/4 (kg/m³)</FormLabel>
                    <FormControl>
                      <Input placeholder="300 kg/m³" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Graviers</h3>
              <FormField
                control={form.control}
                name="gravier38"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gravier 3/8 (kg/m³)</FormLabel>
                    <FormControl>
                      <Input placeholder="350 kg/m³" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gravier815"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gravier 8/15 (kg/m³)</FormLabel>
                    <FormControl>
                      <Input placeholder="350 kg/m³" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gravier1525"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gravier 15/25 (kg/m³)</FormLabel>
                    <FormControl>
                      <Input placeholder="350 kg/m³" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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