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
        className="flex items-center gap-2"
      >
        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
          <FileText className="h-6 w-6 text-indigo-400" />
        </div>
        <SheetTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Nouveau document
        </SheetTitle>
      </motion.div>
    </SheetHeader>
  );
}