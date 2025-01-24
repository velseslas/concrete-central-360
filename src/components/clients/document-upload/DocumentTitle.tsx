import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FileText } from "lucide-react";

export function DocumentTitle() {
  return (
    <SheetHeader className="mb-4">
      <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
        <FileText className="h-6 w-6" />
        Nouveau document
      </SheetTitle>
    </SheetHeader>
  );
}