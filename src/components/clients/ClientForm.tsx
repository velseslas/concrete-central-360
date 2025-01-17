import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ClientBasicInfoFields } from "./ClientBasicInfoFields";
import { ClientAddressFields } from "./ClientAddressFields";
import { ClientContactFields } from "./ClientContactFields";
import { ClientAdminFields } from "./ClientAdminFields";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";

const clientSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  raisonSociale: z.string().min(2, "La raison sociale est requise"),
  telephone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide"),
  adresse: z.string().min(5, "L'adresse est requise"),
  ville: z.string().min(2, "La ville est requise"),
  codePostal: z.string().min(4, "Le code postal est requis"),
  nif: z.string().min(5, "Le NIF est requis"),
  nis: z.string().min(5, "Le NIS est requis"),
  numeroArticle: z.string().min(3, "Le numéro d'article est requis"),
  categorieClient: z.string().min(1, "La catégorie est requise"),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
  clientToEdit?: any;
  onSuccess?: () => void;
}

export function ClientForm({ clientToEdit, onSuccess }: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: clientToEdit || {
      nom: "",
      raisonSociale: "",
      telephone: "",
      email: "",
      adresse: "",
      ville: "",
      codePostal: "",
      nif: "",
      nis: "",
      numeroArticle: "",
      categorieClient: "",
    },
  });

  const onSubmit = async (data: ClientFormValues) => {
    try {
      console.log("Form data:", data);
      
      if (clientToEdit) {
        // Update existing client
        console.log("Updating client:", clientToEdit.id, data);
      } else {
        // Create new client
        console.log("Creating new client:", data);
      }
      
      toast.success(
        clientToEdit ? "Client modifié avec succès" : "Client créé avec succès"
      );
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="h-full flex flex-col w-full max-w-[1200px] mx-auto bg-gray-900/95">
      <SheetHeader className="mb-4">
        <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {clientToEdit ? "Modifier le client" : "Nouveau client"}
        </SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <div className="space-y-6 bg-gray-800/50 rounded-lg p-6 backdrop-blur-xl border border-gray-700/50">
            <ClientBasicInfoFields form={form} />
            <ClientContactFields form={form} />
            <ClientAddressFields form={form} />
            <ClientAdminFields form={form} />
          </div>
          
          <div className="flex justify-end gap-2 sticky bottom-0 bg-gray-900/95 p-4 backdrop-blur-xl border-t border-gray-800">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {clientToEdit ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}