import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { DocumentList } from "@/components/clients/widgets/DocumentList";
import { DocumentUploadDialog } from "@/components/clients/DocumentUploadDialog";
import { motion } from "framer-motion";

export function DocumentsWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="pb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Documents
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DocumentList />
      </div>
    </motion.div>
  );
}