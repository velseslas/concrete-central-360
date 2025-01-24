import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormValues } from "./types";

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
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-800/30 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
                Cliquez pour sélectionner un fichier
              </span>
            </div>
          </label>
        </div>
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  );
}