
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface PersonalInfoTabProps {
  form: UseFormReturn<any>;
}

export function PersonalInfoTab({ form }: PersonalInfoTabProps) {
  return (
    <div className="space-y-5 mt-5">
      <h3 className="text-xl font-semibold text-center mb-4">Informations personnelles</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} className="bg-gray-700 border-gray-600 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} className="bg-gray-700 border-gray-600 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} className="bg-gray-700 border-gray-600 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+213 00 00 00 00" {...field} className="bg-gray-700 border-gray-600 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Adresse</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Adresse complète"
                className="resize-none bg-gray-700 border-gray-600 text-base"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Date de naissance</FormLabel>
            <FormControl>
              <Input type="date" {...field} className="bg-gray-700 border-gray-600 text-base" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
