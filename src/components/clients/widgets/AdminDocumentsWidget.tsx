import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { useState } from "react";
import { motion } from "framer-motion";

export function AdminDocumentsWidget() {
  const [showUploadForm, setShowUploadForm] = useState(false);

  const mockDocuments = [
    { id: 1, title: "Registre de commerce", type: "registre", date: "2024-03-15" },
    { id: 2, title: "Carte fiscale", type: "fiscal", date: "2024-03-14" },
    { id: 3, title: "Attestation d'activité", type: "attestation", date: "2024-03-13" },
  ];

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

          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Ajouté le {new Date(doc.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Télécharger
                  </Button>
                  <Button variant="outline" size="sm">
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}