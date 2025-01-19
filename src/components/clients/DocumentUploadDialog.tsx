import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { FileText, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const documentSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  file: z.any().refine((file) => file?.length === 1, "Un fichier est requis"),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

interface DocumentUploadDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DocumentUploadDialog({ open, onOpenChange }: DocumentUploadDialogProps) {
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
      if (onOpenChange) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast.error("Erreur lors du téléchargement du document");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau document</DialogTitle>
        </DialogHeader>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Titre du document
                  </label>
                  <Input
                    {...form.register("title")}
                    placeholder="Entrez le titre du document"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-400">
                      {String(form.formState.errors.title.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Fichier
                  </label>
                  <div className="relative">
                    <Input
                      type="file"
                      {...form.register("file")}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors bg-gray-800/30"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          Cliquez pour sélectionner un fichier
                        </span>
                      </div>
                    </label>
                    {form.formState.errors.file && (
                      <p className="text-sm text-red-400 mt-1">
                        {String(form.formState.errors.file.message)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
                <Button 
                  type="submit" 
                  disabled={isUploading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isUploading ? (
                    <>
                      <FileText className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Envoyer
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}