import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { DocumentList } from "@/components/clients/widgets/DocumentList";
import { DocumentUploadDialog } from "@/components/clients/DocumentUploadDialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DocumentsWidget() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  console.log("DocumentsWidget - Dialog state:", showUploadDialog);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400" />
            Documents
          </CardTitle>
          <Button 
            onClick={() => setShowUploadDialog(true)}
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau document
          </Button>
        </CardHeader>
        <CardContent>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-y-auto"
          >
            <DocumentList />
          </motion.div>
        </CardContent>
      </Card>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <DocumentUploadDialog onSuccess={() => setShowUploadDialog(false)} />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}