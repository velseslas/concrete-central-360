
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Receipt } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { ClientPaymentReceipt } from "./ClientPaymentReceipt";

const paymentSchema = z.object({
  clientId: z.string(),
  amount: z.string().min(1, "Le montant est requis"),
  paymentMethod: z.string().min(1, "Le mode de paiement est requis"),
  paymentDate: z.string().min(1, "La date de paiement est requise"),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

interface ClientPaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId?: string;
  paymentToEdit?: any;
}

export function ClientPaymentForm({ 
  open, 
  onOpenChange, 
  clientId, 
  paymentToEdit 
}: ClientPaymentFormProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const mockClients = [
    { id: "1", name: "ENTREPRISE ABC" },
    { id: "2", name: "SARL XYZ CONSTRUCTION" },
    { id: "3", name: "ETS HABITAT MODERNE" },
    { id: "4", name: "PROMOTION IMMOBILIERE SUD" }
  ];

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentToEdit ? {
      clientId: paymentToEdit.clientId || clientId || "",
      amount: paymentToEdit.amount ? paymentToEdit.amount.toLocaleString() : "",
      paymentMethod: paymentToEdit.method || "",
      paymentDate: paymentToEdit.date || "",
      reference: paymentToEdit.reference || "",
      notes: paymentToEdit.notes || "",
    } : {
      clientId: clientId || "",
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
    
    setReceiptData({
      client: selectedClient?.name || "",
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      paymentDate: new Date(data.paymentDate),
      reference: data.reference
    });
    
    setShowReceipt(true);
  };

  const handleGenerateReceipt = () => {
    const { clientId, amount, paymentMethod, paymentDate } = form.getValues();
    
    if (!clientId || !amount || !paymentMethod || !paymentDate) {
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

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

              {form.watch("paymentMethod") === "especes" && (
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
