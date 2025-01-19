import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DocumentList } from "./DocumentList";
import { useState } from "react";
import { DocumentUploadDialog } from "./DocumentUploadDialog";

export function DocumentsWidget() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-bold">Documents</CardTitle>
        <Button 
          onClick={() => setShowUploadDialog(true)}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-indigo-500/20 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Document
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