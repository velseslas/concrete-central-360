import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";

export function DocumentTitle() {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Nouveau document
        </div>
      </DialogTitle>
    </DialogHeader>
  );
}