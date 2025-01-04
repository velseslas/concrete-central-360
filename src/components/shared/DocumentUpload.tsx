import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FileText, Upload } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentUploadProps {
  clientId?: number;
  onUploadSuccess?: () => void;
}

interface FormValues {
  title: string;
  type: string;
  file: FileList | null;
}

export function DocumentUpload({ clientId, onUploadSuccess }: DocumentUploadProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      type: "",
      file: null
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    console.log("Client ID:", clientId);
    
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de document</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de document" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="registre">Registre de commerce</SelectItem>
                  <SelectItem value="fiscal">Carte d'identification fiscale</SelectItem>
                  <SelectItem value="attestation">Attestation d'activité</SelectItem>
                  <SelectItem value="statuts">Statuts de l'entreprise</SelectItem>
                  <SelectItem value="certificat">Certificats de qualité</SelectItem>
                  <SelectItem value="references">Références clients</SelectItem>
                  <SelectItem value="execution">Attestations de bonne exécution</SelectItem>
                </SelectContent>
              </Select>
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