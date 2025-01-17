import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Printer } from "lucide-react";
import { ClientBasicInfoFields } from "./ClientBasicInfoFields";
import { ClientAddressFields } from "./ClientAddressFields";
import { ClientContactFields } from "./ClientContactFields";
import { ClientAdminFields } from "./ClientAdminFields";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const clientSchema = z.object({
  categorieClient: z.string().min(1, "La catégorie client est requise"),
  raisonSociale: z.string().min(2, "La raison sociale est requise"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  contact: z.string().min(2, "Le contact est requis"),
  adresse: z.string().min(5, "L'adresse est requise"),
  ville: z.string().min(2, "La ville est requise"),
  codePostal: z.string().min(4, "Le code postal est requis"),
  telephone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide"),
  registreCommerce: z.string().min(1, "Le registre de commerce est requis"),
  nif: z.string().min(1, "Le NIF est requis"),
  nis: z.string().min(1, "Le NIS est requis"),
  numeroArticle: z.string().min(1, "L'article imposition est requis"),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
  clientToEdit?: ClientFormValues;
  onSuccess?: () => void;
}

export function ClientForm({ clientToEdit, onSuccess }: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: clientToEdit || {
      categorieClient: "",
      raisonSociale: "",
      nom: "",
      contact: "",
      adresse: "",
      ville: "",
      codePostal: "",
      telephone: "",
      email: "",
      registreCommerce: "",
      nif: "",
      nis: "",
      numeroArticle: "",
    },
  });

  const onSubmit = async (data: ClientFormValues) => {
    console.log("Client data:", data);
    toast.success(clientToEdit ? "Client modifié avec succès" : "Client créé avec succès");
    if (onSuccess) {
      onSuccess();
    }
  };

  const handlePrint = () => {
    if (!clientToEdit) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Détails du client</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; border: 1px solid #ddd; }
              th { background-color: #f5f5f5; text-align: left; }
              h1 { color: #2563eb; }
            </style>
          </head>
          <body>
            <h1>Détails du client</h1>
            <table>
              ${Object.entries(clientToEdit)
                .filter(([key]) => key !== 'id')
                .map(([key, value]) => `
                  <tr>
                    <th>${key.replace(/([A-Z])/g, ' $1').toLowerCase()}</th>
                    <td>${value || '-'}</td>
                  </tr>
                `).join('')}
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="h-full flex flex-col w-full max-w-[1200px] mx-auto bg-gray-900/95">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {clientToEdit ? "Modifier le client" : "Nouveau client"}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <div className="space-y-6 bg-gray-800/50 rounded-lg p-6 backdrop-blur-xl border border-gray-700/50">
            <div className="grid grid-cols-1 gap-6">
              <ClientBasicInfoFields form={form} />
              <ClientAddressFields form={form} />
              <ClientContactFields form={form} />
              <ClientAdminFields form={form} />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700/50">
            {clientToEdit && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrint}
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600"
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
            )}
            <Button 
              type="button" 
              variant="outline" 
              onClick={onSuccess}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              {clientToEdit ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}