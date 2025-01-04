import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DocumentUpload } from "@/components/shared/DocumentUpload";

interface DocumentsWidgetProps {
  supplierId: number;
}

export function DocumentsWidget({ supplierId }: DocumentsWidgetProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
        <Button onClick={() => setShowUploadForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau document
        </Button>
      </CardHeader>
      <CardContent>
        <DocumentUpload clientId={supplierId} />
      </CardContent>
    </Card>
  );
}