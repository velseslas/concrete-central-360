import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormValues } from "./types";
import { FileUploadField } from "./FileUploadField";

interface DocumentFormProps {
  form: UseFormReturn<DocumentFormValues>;
  isUploading: boolean;
  onCancel?: () => void;
  onSubmit: (data: DocumentFormValues) => void;
}

export function DocumentForm({ form, isUploading, onCancel, onSubmit }: DocumentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6 bg-gray-800/50 rounded-lg p-6 backdrop-blur-xl border border-gray-700/50">
          <FileUploadField form={form} />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700/50">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isUploading}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600"
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={isUploading}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            {isUploading ? "Téléchargement..." : "Télécharger"}
          </Button>
        </div>
      </form>
    </Form>
  );
}