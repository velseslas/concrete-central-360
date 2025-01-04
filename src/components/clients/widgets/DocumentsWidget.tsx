import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DocumentsWidgetProps {
  clientId: number;
}

export function DocumentsWidget({ clientId }: DocumentsWidgetProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <Card className="card-dashboard">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
        <Button onClick={() => setShowUploadForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau document
        </Button>
      </CardHeader>
      <CardContent>
        {showUploadForm ? (
          <DocumentUpload 
            clientId={clientId} 
            onUploadSuccess={() => setShowUploadForm(false)}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}