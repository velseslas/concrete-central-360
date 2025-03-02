
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FormulationBasicInfo } from "./FormulationBasicInfo";
import { FormulationSablesSection } from "./FormulationSablesSection";
import { FormulationGraviersSection } from "./FormulationGraviersSection";
import { FormulationAdditionalSection } from "./FormulationAdditionalSection";
import { motion } from "framer-motion";
import { toast } from "sonner";

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

  const handleSubmit = (data: FormulationFormValues) => {
    onSubmit(data);
    toast.success("Formulation créée avec succès!");
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl flex flex-col">
        <DialogHeader className="sticky top-0 z-10 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 pb-4">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Nouvelle formulation
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Créez une nouvelle formulation de béton en renseignant les informations ci-dessous
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-1 overflow-auto">
            <div className="flex-1 space-y-6 overflow-y-auto p-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6"
              >
                <FormulationBasicInfo form={form} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6"
              >
                <FormulationSablesSection form={form} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6"
              >
                <FormulationGraviersSection form={form} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 mb-20"
              >
                <FormulationAdditionalSection form={form} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end space-x-3 pt-4 border-t border-gray-700/50 sticky bottom-0 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 p-4 mt-auto"
            >
              <Button 
                type="button"
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 hover:border-gray-600/50 text-white transition-all duration-200"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-200"
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
