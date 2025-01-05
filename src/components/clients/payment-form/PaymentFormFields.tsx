import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { PaymentFormValues } from "./types";
import { useState } from "react";
import { PaymentReceipt } from "./PaymentReceipt";

interface PaymentFormFieldsProps {
  form: UseFormReturn<PaymentFormValues>;
  mockClients: Array<{ id: string; name: string }>;
  mockProjects: Array<{ id: string; name: string; clientId: string }>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PaymentFormFields({ form, mockClients, mockProjects, handleFileUpload }: PaymentFormFieldsProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const selectedClientId = form.watch("clientId");
  const selectedPaymentMethod = form.watch("paymentMethod");
  const filteredProjects = mockProjects.filter(
    project => project.clientId === selectedClientId
  );

  const handleGenerateReceipt = () => {
    console.log("Generating receipt for payment:", form.getValues());
    setShowReceipt(true);
  };

  const selectedClient = mockClients.find(client => client.id === selectedClientId);
  const selectedProject = mockProjects.find(project => project.id === form.watch("projectId"));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
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
      </div>

      <div className="grid grid-cols-2 gap-6">
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
      </div>

      <div className="grid grid-cols-2 gap-6">
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

      {selectedPaymentMethod === "cash" && (
        <div className="flex justify-center">
          <Button
            onClick={handleGenerateReceipt}
            variant="outline"
            className="w-full md:w-auto"
          >
            <FileText className="mr-2 h-4 w-4" />
            Générer le bon de paiement
          </Button>
        </div>
      )}

      {showReceipt && (
        <PaymentReceipt
          open={showReceipt}
          onOpenChange={setShowReceipt}
          paymentData={form.getValues()}
          clientName={selectedClient?.name || ""}
          projectName={selectedProject?.name || ""}
        />
      )}
    </div>
  );
}