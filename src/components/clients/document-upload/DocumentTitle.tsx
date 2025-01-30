import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export function DocumentTitle() {
  return (
    <SheetHeader className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Nouveau document
        </SheetTitle>
      </motion.div>
    </SheetHeader>
  );
}