import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DocumentList } from "../DocumentList";
import { DocumentUploadDialog } from "../DocumentUploadDialog";

export function DocumentsWidget() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau document
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <DocumentUploadDialog />
          </SheetContent>
        </Sheet>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DocumentList />
      </div>
    </div>
  );
}