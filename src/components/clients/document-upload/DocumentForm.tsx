import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormValues } from "./types";
import { FileUploadField } from "./FileUploadField";
import { motion } from "framer-motion";

interface DocumentFormProps {
  form: UseFormReturn<DocumentFormValues>;
  isUploading: boolean;
  onCancel?: () => void;
  onSubmit: (data: DocumentFormValues) => void;
}

export function DocumentForm({ form, isUploading, onCancel, onSubmit }: DocumentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-lg p-6 backdrop-blur-xl border border-gray-700/50 shadow-lg"
        >
          <FileUploadField form={form} />
        </motion.div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700/50">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isUploading}
            className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 border-gray-600 backdrop-blur-sm transition-all duration-300"
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={isUploading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
          >
            {isUploading ? "Téléchargement..." : "Télécharger"}
          </Button>
        </div>
      </form>
    </Form>
  );
}