import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormulationBasicInfo } from "./FormulationBasicInfo";
import { FormulationSablesSection } from "./FormulationSablesSection";
import { FormulationGraviersSection } from "./FormulationGraviersSection";
import { FormulationAdditionalSection } from "./FormulationAdditionalSection";

const formulationSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  resistance: z.string().min(1, "La résistance est requise"),
  ciment: z.string().min(1, "Le dosage en ciment est requis"),
  sable01: z.string().min(1, "Le dosage en sable 0/1 est requis"),
  sable03: z.string().min(1, "Le dosage en sable 0/3 est requis"),
  sable04: z.string().min(1, "Le dosage en sable 0/4 est requis"),
  gravier38: z.string().min(1, "Le dosage en gravier 3/8 est requis"),
  gravier815: z.string().min(1, "Le dosage en gravier 8/15 est requis"),
  gravier1525: z.string().min(1, "Le dosage en gravier 15/25 est requis"),
  eau: z.string().min(1, "Le dosage en eau est requis"),
  adjuvant: z.string().min(1, "Le dosage en adjuvant est requis"),
});

export type FormulationFormValues = z.infer<typeof formulationSchema>;

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
      adjuvant: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Nouvelle formulation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormulationBasicInfo form={form} />
            <FormulationSablesSection form={form} />
            <FormulationGraviersSection form={form} />
            <FormulationAdditionalSection form={form} />
            <div className="flex justify-end space-x-2 pt-4 border-t">
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