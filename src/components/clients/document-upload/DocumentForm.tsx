
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DocumentFormValues, documentSchema } from "./types";
import { DocumentFormFields } from "./DocumentFormFields";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText } from "lucide-react";

interface DocumentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  clients: { id: string; nom: string }[];
}

export function DocumentForm({ onSuccess, onCancel, clients }: DocumentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      clientId: "",
      title: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: DocumentFormValues) => {
    try {
      setIsSubmitting(true);
      const file = data.file[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Save document metadata to database
      const { error: dbError } = await supabase.from('documents').insert({
        client_id: data.clientId,
        title: data.title,
        file_path: fileName,
        file_name: file.name,
        content_type: file.type,
      });

      if (dbError) {
        throw dbError;
      }

      toast.success("Document téléchargé avec succès");
      onSuccess?.();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Erreur lors du téléchargement du document");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
              <FileText className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          
          <DocumentFormFields form={form} clients={clients} />
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700/50">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 hover:from-gray-700/80 hover:to-gray-600/80 text-gray-200 border-gray-600"
              >
                Annuler
              </Button>
            )}
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              {isSubmitting ? "Téléchargement..." : "Télécharger"}
            </Button>
          </div>
        </motion.div>
      </form>
    </Form>
  );
}
