import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormValues } from "./types";
import { motion } from "framer-motion";

interface FileUploadFieldProps {
  form: UseFormReturn<DocumentFormValues>;
}

export function FileUploadField({ form }: FileUploadFieldProps) {
  return (
    <FormItem className="w-full">
      <FormLabel className="text-gray-200">Fichier</FormLabel>
      <FormControl>
        <div className="relative">
          <input
            type="file"
            {...form.register("file")}
            className="hidden"
            id="file-upload"
          />
          <motion.label
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            htmlFor="file-upload"
            className="flex items-center justify-center w-full p-8 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500/50 transition-colors bg-gray-800/30 backdrop-blur-sm group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex flex-col items-center space-y-2 relative z-10">
              <Upload className="h-8 w-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
                Cliquez pour sélectionner un fichier
              </span>
            </div>
          </motion.label>
        </div>
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  );
}