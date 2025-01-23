import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormValues } from "./types";
import { FileUploadField } from "./FileUploadField";

interface DocumentFormProps {
  form: UseFormReturn<DocumentFormValues>;
  isUploading: boolean;
  onCancel: () => void;
  onSubmit: (data: DocumentFormValues) => void;
}

export function DocumentForm({ form, isUploading, onCancel, onSubmit }: DocumentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 overflow-y-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Titre du document
            </label>
            <Input
              {...form.register("title")}
              placeholder="Entrez le titre du document"
              className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-400">
                {String(form.formState.errors.title.message)}
              </p>
            )}
          </div>

          <FileUploadField form={form} />
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
          <Button 
            type="button"
            variant="outline"
            onClick={onCancel}
            className="bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={isUploading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          >
            {isUploading ? (
              <>
                <FileText className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Envoyer
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}