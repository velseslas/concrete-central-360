import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentUploadProps {
  onUploadSuccess?: () => void;
}

interface FormValues {
  clientId: string;
  title: string;
  file: FileList | null;
}

const mockClients = [
  { id: "1", name: "Entreprise ABC" },
  { id: "2", name: "Société XYZ" },
  { id: "3", name: "Company 123" },
];

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      clientId: "",
      title: "",
      file: null
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    toast.success("Document téléchargé avec succès");
    form.reset();
    if (onUploadSuccess) {
      onUploadSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un client" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du document</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le titre du document" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Fichier</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              form.reset();
              if (onUploadSuccess) onUploadSuccess();
            }}
          >
            Annuler
          </Button>
          <Button type="submit">
            <FileText className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </div>
      </form>
    </Form>
  );
}