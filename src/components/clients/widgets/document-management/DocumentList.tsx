
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface Document {
  id: string;
  title: string;
}

interface DocumentListProps {
  documents: Document[];
  onDocumentClick: (doc: Document) => void;
}

export function DocumentList({ documents, onDocumentClick }: DocumentListProps) {
  const handleDelete = async (docId: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', docId);

      if (error) throw error;

      toast.success("Document supprimé avec succès");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Erreur lors de la suppression du document");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
    >
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 
                  className="text-xl font-semibold text-white cursor-pointer hover:text-[#7C3AED]"
                  onClick={() => onDocumentClick(doc)}
                >
                  {doc.title}
                </h3>
                <p className="text-sm text-gray-400">Document #{doc.id.substring(0, 8)}</p>
              </div>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer ce document ? Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700 border-gray-700">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(doc.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="ghost" 
              className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
              onClick={() => onDocumentClick(doc)}
            >
              Voir le document
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
