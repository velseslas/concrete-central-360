import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeliverySupplierInfoProps {
  control: Control<any>;
}

export function DeliverySupplierInfo({ control }: DeliverySupplierInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-200">Informations fournisseur</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fournisseur</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un fournisseur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="supplier1">Fournisseur 1</SelectItem>
                  <SelectItem value="supplier2">Fournisseur 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="producer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Producteur</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un producteur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="producer1">Producteur 1</SelectItem>
                  <SelectItem value="producer2">Producteur 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un produit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="product1">Produit 1</SelectItem>
                  <SelectItem value="product2">Produit 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="vehicleNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matricule du camion</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 1234-123-16" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="deliveryNoteNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro bon de livraison</FormLabel>
              <FormControl>
                <Input placeholder="Ex: BL-2024-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}