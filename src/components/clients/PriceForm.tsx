import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PriceFormFields, priceFormSchema, type PriceFormValues } from "./price/PriceFormFields";
import { motion } from "framer-motion";

interface PriceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PriceForm({ open, onOpenChange }: PriceFormProps) {
  console.log("PriceForm rendered with open:", open);

  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      client: "",
      product: "",
      category: "",
      project: "",
      price: "",
    },
  });

  const onSubmit = async (data: PriceFormValues) => {
    try {
      console.log("Submitting price data:", data);
      toast.success("Prix ajouté avec succès");
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting price:", error);
      toast.error("Erreur lors de l'ajout du prix");
    }
  };

  const handleClose = () => {
    console.log("Closing price form");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50 shadow-xl backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white bg-clip-text">
              Nouveau prix
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <PriceFormFields form={form} />
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700/50">
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  type="button"
                  className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white transition-colors duration-200"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                >
                  Enregistrer
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}