import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const paymentSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  projectId: z.string().min(1, "Le chantier est requis"),
  amount: z.string().min(1, "Le montant est requis"),
  paymentMethod: z.string().min(1, "Le mode de paiement est requis"),
  paymentDate: z.string().min(1, "La date de paiement est requise"),
  reference: z.string().min(1, "La référence est requise"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
  paymentToEdit?: PaymentFormValues;
}

// Données mockées pour l'exemple
const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
];

const mockProjects = [
  { id: "1", name: "Chantier 1", clientId: "1" },
  { id: "2", name: "Chantier 2", clientId: "1" },
  { id: "3", name: "Chantier 3", clientId: "2" },
];

export function PaymentForm({ open, onOpenChange, clientId, paymentToEdit }: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentToEdit || {
      clientId: clientId.toString(),
      projectId: "",
      amount: "",
      paymentMethod: "",
      paymentDate: "",
      reference: "",
    },
  });

  const selectedClientId = form.watch("clientId");
  const filteredProjects = mockProjects.filter(
    project => project.clientId === selectedClientId
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Document de paiement:", file);
      toast.success("Document téléchargé avec succès");
    }
  };

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Payment data:", data);
    toast.success(paymentToEdit ? "Paiement modifié" : "Paiement enregistré");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {paymentToEdit ? "Modifier le paiement" : "Nouveau paiement"}
          </DialogTitle>
        </DialogHeader>
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
                        <SelectValue placeholder="Sélectionner un client" />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chantier</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un chantier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode de paiement</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un mode de paiement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cash">Espèces</SelectItem>
                      <SelectItem value="check">Chèque</SelectItem>
                      <SelectItem value="transfer">Virement</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de paiement</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Référence</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro de chèque, référence virement..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Document justificatif</FormLabel>
              <div className="relative">
                <Input
                  type="file"
                  className="hidden"
                  id="payment-doc"
                  onChange={handleFileUpload}
                />
                <Button asChild variant="outline" className="w-full">
                  <label htmlFor="payment-doc" className="cursor-pointer flex items-center justify-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger un document
                  </label>
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {paymentToEdit ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}