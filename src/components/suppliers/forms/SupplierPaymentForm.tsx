
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CalendarIcon, Receipt } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { SupplierPaymentReceipt } from "./SupplierPaymentReceipt";

// Mock data for suppliers - this would come from your API/database in a real app
const mockSuppliers = [
  { id: "1", name: "SARL CIMENT PLUS" },
  { id: "2", name: "EURL AGREGATS" },
  { id: "3", name: "ETS COMPTOIR METALLIQUE" },
  { id: "4", name: "SPA EQUIPEMENTS BTP" },
  { id: "5", name: "SARL LOCATION ENGINS" }
];

// Mock data for invoices - this would be filtered based on selected supplier
const mockInvoices = [
  { id: "FAC-2024-001", supplier: "1", amount: 850000, remainingAmount: 350000, dueDate: "2024-07-30" },
  { id: "FAC-2024-002", supplier: "2", amount: 325000, remainingAmount: 0, dueDate: "2024-07-15" },
  { id: "FAC-2024-003", supplier: "3", amount: 1200000, remainingAmount: 600000, dueDate: "2024-07-20" },
  { id: "FAC-2024-004", supplier: "4", amount: 430000, remainingAmount: 430000, dueDate: "2024-08-05" },
  { id: "FAC-2024-005", supplier: "5", amount: 750000, remainingAmount: 500000, dueDate: "2024-07-25" }
];

const paymentSchema = z.object({
  supplier: z.string({ required_error: "Veuillez sélectionner un fournisseur" }),
  invoice: z.string({ required_error: "Veuillez sélectionner une facture" }).optional(),
  amount: z.string({ required_error: "Montant requis" })
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Le montant doit être un nombre positif",
    }),
  paymentMethod: z.string({ required_error: "Mode de paiement requis" }),
  paymentDate: z.date({ required_error: "Date de paiement requise" }),
  notes: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface SupplierPaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentToEdit?: Partial<PaymentFormValues>;
  invoiceId?: string;
  supplierId?: string;
}

export function SupplierPaymentForm({ 
  open, 
  onOpenChange, 
  paymentToEdit, 
  invoiceId, 
  supplierId 
}: SupplierPaymentFormProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      supplier: supplierId || paymentToEdit?.supplier || "",
      invoice: invoiceId || paymentToEdit?.invoice || "",
      amount: paymentToEdit?.amount || "",
      paymentMethod: paymentToEdit?.paymentMethod || "",
      paymentDate: paymentToEdit?.paymentDate || new Date(),
      notes: paymentToEdit?.notes || "",
    },
  });

  // Get relevant invoices for selected supplier
  const relevantInvoices = mockInvoices.filter(
    invoice => invoice.supplier === form.watch("supplier") && invoice.remainingAmount > 0
  );

  // Get selected invoice details
  const selectedInvoice = mockInvoices.find(
    invoice => invoice.id === form.watch("invoice")
  );

  // Get selected supplier details
  const selectedSupplier = mockSuppliers.find(
    supplier => supplier.id === form.watch("supplier")
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Document de paiement:", file);
      toast.success("Document téléchargé avec succès");
    }
  };

  const handleGenerateReceipt = () => {
    // Check if required fields are filled
    const { supplier, amount, paymentMethod } = form.getValues();
    
    if (!supplier || !amount || !paymentMethod) {
      toast.error("Veuillez remplir tous les champs obligatoires avant de générer un reçu");
      return;
    }
    
    setShowReceipt(true);
  };

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Payment data:", data);
    
    // Format for display
    const formattedData = {
      ...data,
      paymentDate: format(data.paymentDate, 'dd/MM/yyyy'),
      amount: Number(data.amount).toLocaleString('fr-FR') + ' DA'
    };
    
    toast.success(
      paymentToEdit ? "Paiement modifié avec succès" : "Paiement enregistré avec succès", 
      {
        description: `${formattedData.amount} pour ${mockSuppliers.find(s => s.id === data.supplier)?.name}`,
      }
    );
    
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              {paymentToEdit ? "Modifier le paiement" : "Nouveau paiement fournisseur"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Fournisseur</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Reset invoice when supplier changes
                          form.setValue("invoice", "");
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                            <SelectValue placeholder="Sélectionner un fournisseur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                          {mockSuppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {form.watch("supplier") && (
                  <FormField
                    control={form.control}
                    name="invoice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Facture</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                              <SelectValue placeholder="Sélectionner une facture (optionnel)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                            {relevantInvoices.length > 0 ? (
                              relevantInvoices.map((invoice) => (
                                <SelectItem key={invoice.id} value={invoice.id}>
                                  {invoice.id} - {invoice.remainingAmount.toLocaleString('fr-FR')} DA
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-invoices" disabled>
                                Aucune facture avec solde dû
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                )}

                {selectedInvoice && (
                  <div className="p-3 rounded-md bg-gray-800/50 border border-gray-700/50">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Montant restant : </span>
                      <span className="text-amber-400">
                        {selectedInvoice.remainingAmount.toLocaleString('fr-FR')} DA
                      </span>
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Échéance : </span>
                      <span className="text-blue-400">{selectedInvoice.dueDate}</span>
                    </p>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Montant</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="0"
                            className="bg-gray-800 border-gray-700 text-gray-200 pr-14"
                            {...field}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-400">DA</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Mode de paiement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                            <SelectItem value="virement">Virement bancaire</SelectItem>
                            <SelectItem value="cheque">Chèque</SelectItem>
                            <SelectItem value="especes">Espèces</SelectItem>
                            <SelectItem value="carte">Carte bancaire</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Date de paiement</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700",
                                  !field.value && "text-gray-400"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy", { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-auto p-0 bg-gray-800 border-gray-700" 
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="bg-gray-800 text-gray-200"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Notes (optionnel)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Notes ou commentaires..." 
                          className="bg-gray-800 border-gray-700 text-gray-200"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel className="text-gray-300">Document justificatif (optionnel)</FormLabel>
                  <div className="relative">
                    <Input
                      type="file"
                      className="hidden"
                      id="payment-doc"
                      onChange={handleFileUpload}
                    />
                    <Button asChild variant="outline" className="w-full bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
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
                      className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border-amber-500/20 transition-all duration-200 hover:scale-105 w-full"
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      Générer un reçu de paiement
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="border-gray-700 hover:bg-gray-700 text-gray-300"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {paymentToEdit ? "Modifier" : "Enregistrer"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {showReceipt && (
        <SupplierPaymentReceipt
          open={showReceipt}
          onOpenChange={setShowReceipt}
          paymentData={{
            supplier: selectedSupplier?.name || "",
            amount: form.getValues().amount || "0",
            paymentMethod: form.getValues().paymentMethod || "",
            paymentDate: form.getValues().paymentDate,
            notes: form.getValues().notes,
          }}
        />
      )}
    </>
  );
}
