
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Receipt } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ClientPaymentReceipt } from "@/components/clients/forms/ClientPaymentReceipt";

const paymentSchema = z.object({
  clientId: z.string().min(1, "Le client est requis"),
  projectId: z.string().min(1, "Le chantier est requis"),
  amount: z.string().min(1, "Le montant est requis"),
  paymentMethod: z.string().min(1, "Le mode de paiement est requis"),
  paymentDate: z.string().min(1, "La date de paiement est requise"),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentToEdit?: z.infer<typeof paymentSchema>;
  clientId?: number;
}

export function PaymentForm({ open, onOpenChange, paymentToEdit, clientId }: PaymentFormProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Mock data for testing
  const mockClients = [
    { id: "1", name: "ENTREPRISE ABC" },
    { id: "2", name: "SARL XYZ CONSTRUCTION" },
    { id: "3", name: "ETS HABITAT MODERNE" },
    { id: "4", name: "PROMOTION IMMOBILIERE SUD" }
  ];
  
  const mockProjects = [
    { id: "1", name: "Projet Résidentiel Alger", clientId: "1" },
    { id: "2", name: "Construction Centre Commercial", clientId: "1" },
    { id: "3", name: "Rénovation Bureaux", clientId: "2" },
    { id: "4", name: "Villa Privée", clientId: "3" },
    { id: "5", name: "Projet Résidentiel Oran", clientId: "4" }
  ];

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentToEdit ? {
      clientId: paymentToEdit.clientId,
      projectId: paymentToEdit.projectId,
      amount: paymentToEdit.amount,
      paymentMethod: paymentToEdit.paymentMethod,
      paymentDate: paymentToEdit.paymentDate,
      reference: paymentToEdit.reference,
      notes: paymentToEdit.notes,
    } : {
      clientId: clientId ? clientId.toString() : "",
      projectId: "",
      amount: "",
      paymentMethod: "",
      paymentDate: new Date().toISOString().substring(0, 10),
      reference: "",
      notes: "",
    },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      const formattedValue = Number(value).toLocaleString();
      form.setValue('amount', formattedValue);
    } else {
      form.setValue('amount', '');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Document de paiement:", file);
      toast.success("Document téléchargé avec succès");
    }
  };

  const generateReceipt = (data: z.infer<typeof paymentSchema>) => {
    const selectedClient = mockClients.find(client => client.id === data.clientId);
    const selectedProject = mockProjects.find(project => project.id === data.projectId);
    
    setReceiptData({
      client: selectedClient?.name || "",
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      paymentDate: new Date(data.paymentDate),
      reference: data.reference,
      notes: data.notes,
      project: selectedProject?.name
    });
    
    setShowReceipt(true);
  };

  const handleGenerateReceipt = () => {
    const { clientId, projectId, amount, paymentMethod, paymentDate } = form.getValues();
    
    if (!clientId || !projectId || !amount || !paymentMethod || !paymentDate) {
      toast.error("Veuillez remplir tous les champs obligatoires avant de générer un reçu");
      return;
    }
    
    generateReceipt(form.getValues());
  };

  const onSubmit = (data: z.infer<typeof paymentSchema>) => {
    // Convertir le montant formaté en nombre avant l'envoi
    const formattedData = {
      ...data,
      amount: data.amount ? parseFloat(data.amount.replace(/\s/g, '').replace(/,/g, '')) : 0,
    };
    
    console.log("Payment data:", formattedData);
    toast.success(paymentToEdit ? "Paiement modifié" : "Paiement enregistré");
    
    if (data.paymentMethod === "especes" && !paymentToEdit) {
      generateReceipt(data);
    } else {
      onOpenChange(false);
    }
  };

  // Get selected client ID for filtering projects
  const selectedClientId = form.watch("clientId");
  // Get payment method to show/hide receipt button
  const selectedPaymentMethod = form.watch("paymentMethod");
  // Filter projects based on selected client
  const filteredProjects = mockProjects.filter(project => project.clientId === selectedClientId);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {paymentToEdit ? "Modifier le paiement" : "Nouveau paiement client"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedClientId}>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Montant</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          onChange={handleAmountChange}
                          placeholder="0"
                        />
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
                          <SelectItem value="especes">Espèces</SelectItem>
                          <SelectItem value="cheque">Chèque</SelectItem>
                          <SelectItem value="virement">Virement</SelectItem>
                          <SelectItem value="carte">Carte bancaire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Notes additionnelles..." {...field} />
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

              {selectedPaymentMethod === "especes" && (
                <div className="flex justify-center mt-2">
                  <Button
                    type="button"
                    onClick={handleGenerateReceipt}
                    variant="outline"
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border-blue-500/20 transition-all duration-200 hover:scale-105 w-full"
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Générer un reçu de paiement
                  </Button>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {paymentToEdit ? "Modifier" : "Enregistrer"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {showReceipt && (
        <ClientPaymentReceipt
          open={showReceipt}
          onOpenChange={(open) => {
            setShowReceipt(open);
            if (!open) onOpenChange(false);
          }}
          paymentData={receiptData}
        />
      )}
    </>
  );
}
