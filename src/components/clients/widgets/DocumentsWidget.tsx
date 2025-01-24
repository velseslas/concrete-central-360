import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { DocumentList } from "@/components/clients/widgets/DocumentList";
import { DocumentUploadDialog } from "@/components/clients/DocumentUploadDialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function DocumentsWidget() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="pb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Documents
        </h2>
        <Button 
          onClick={() => setShowUploadDialog(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau document
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DocumentList />
      </div>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
          <DocumentUploadDialog onSuccess={() => setShowUploadDialog(false)} />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}