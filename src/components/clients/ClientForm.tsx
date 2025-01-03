import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientBasicInfoFields } from "./ClientBasicInfoFields";
import { ClientAddressFields } from "./ClientAddressFields";
import { ClientAdminFields } from "./ClientAdminFields";
import { Printer } from "lucide-react";

const clientSchema = z.object({
  categorieClient: z.string().min(1, "La catégorie client est requise"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  contact: z.string().min(2, "Le contact est requis"),
  raisonSociale: z.string().min(2, "La raison sociale est requise"),
  telephone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide"),
  adresse: z.string().min(5, "L'adresse est requise"),
  ville: z.string().min(2, "La ville est requise"),
  codePostal: z.string().min(4, "Le code postal est requis"),
  registreCommerce: z.string().min(1, "Le registre de commerce est requis"),
  nif: z.string().min(1, "Le NIF est requis"),
  nis: z.string().min(1, "Le NIS est requis"),
  numeroArticle: z.string().min(1, "L'article imposition est requis"),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientToEdit?: ClientFormValues;
}

export function ClientForm({ open, onOpenChange, clientToEdit }: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: clientToEdit || {
      categorieClient: "",
      nom: "",
      contact: "",
      raisonSociale: "",
      telephone: "",
      email: "",
      adresse: "",
      ville: "",
      codePostal: "",
      registreCommerce: "",
      nif: "",
      nis: "",
      numeroArticle: "",
    },
  });

  const onSubmit = (data: ClientFormValues) => {
    console.log("Client data:", data);
    onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {clientToEdit ? "Modifier le client" : "Nouveau client"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ClientBasicInfoFields form={form} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ClientAddressFields form={form} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ClientAdminFields form={form} />
            </div>
            <div className="flex justify-end space-x-2 pt-4 border-t">
              {clientToEdit && (
                <Button type="button" variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
              )}
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {clientToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}