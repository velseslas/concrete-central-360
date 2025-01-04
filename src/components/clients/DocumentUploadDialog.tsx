import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const documentSchema = z.object({
  // Add your document schema here
});

type DocumentFormValues = z.infer<typeof documentSchema>;

export function DocumentUploadDialog() {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      // Add your default values here
    },
  });

  const onSubmit = async (data: DocumentFormValues) => {
    setIsUploading(true);
    try {
      console.log("Document data:", data);
      // Add your upload logic here
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold text-primary">
          Nouveau document
        </SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1 overflow-y-auto">
          {/* Add your form fields here */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}