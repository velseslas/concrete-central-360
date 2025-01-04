import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DocumentList } from "./DocumentList";
import { DocumentUploadDialog } from "./DocumentUploadDialog";

export function DocumentsWidget() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <Card className="card-dashboard">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
        <Button onClick={() => setShowUploadDialog(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau document
        </Button>
      </CardHeader>
      <CardContent>
        <DocumentList />
      </CardContent>

      <DocumentUploadDialog 
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
      />
    </Card>
  );
}