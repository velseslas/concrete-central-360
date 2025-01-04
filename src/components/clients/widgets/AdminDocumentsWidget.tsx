import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { useState } from "react";
import { motion } from "framer-motion";

const mockClients = [
  { id: 1, nom: "Entreprise ABC" },
  { id: 2, nom: "Société XYZ" },
  { id: 3, nom: "Company 123" },
];

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

          <div className="space-y-2 mt-4">
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>{client.nom}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}