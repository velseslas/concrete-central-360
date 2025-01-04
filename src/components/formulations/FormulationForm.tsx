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
import { motion } from "framer-motion";

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
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gray-900/90 backdrop-blur-lg border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Nouvelle formulation
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormulationBasicInfo form={form} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormulationSablesSection form={form} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormulationGraviersSection form={form} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormulationAdditionalSection form={form} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end space-x-2 pt-4 border-t border-gray-700"
            >
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 hover:border-gray-600 text-white"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Créer
              </Button>
            </motion.div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}