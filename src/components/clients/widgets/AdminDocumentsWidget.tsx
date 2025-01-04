import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { useState } from "react";
import { motion } from "framer-motion";

export function AdminDocumentsWidget() {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gestion des Documents
          </CardTitle>
          <Button onClick={() => setShowUploadForm(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau document
          </Button>
        </CardHeader>
        <CardContent>
          {showUploadForm ? (
            <div className="mb-6">
              <DocumentUpload 
                onUploadSuccess={() => setShowUploadForm(false)}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}