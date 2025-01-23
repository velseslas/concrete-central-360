import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { DocumentTitle } from "./document-upload/DocumentTitle";
import { DocumentForm } from "./document-upload/DocumentForm";
import { DocumentFormValues, documentSchema } from "./document-upload/types";

export function DocumentUploadDialog() {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: DocumentFormValues) => {
    setIsUploading(true);
    try {
      console.log("Document data:", data);
      toast.success("Document téléchargé avec succès");
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast.error("Erreur lors du téléchargement du document");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <DocumentTitle />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full flex flex-col"
      >
        <DocumentForm 
          form={form}
          isUploading={isUploading}
          onCancel={() => {}}
          onSubmit={onSubmit}
        />
      </motion.div>
    </>
  );
}