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
        <FileUploadField form={form} />
        
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isUploading}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={isUploading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isUploading ? "Téléchargement..." : "Télécharger"}
          </Button>
        </div>
      </form>
    </Form>
  );
}