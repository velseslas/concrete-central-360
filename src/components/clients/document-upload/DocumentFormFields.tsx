
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormValues } from "./types";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

interface DocumentFormFieldsProps {
  form: UseFormReturn<DocumentFormValues>;
  clients: { id: string; nom: string }[];
}

export function DocumentFormFields({ form, clients }: DocumentFormFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="clientId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Client</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-gray-200">
                  <SelectValue placeholder="Sélectionnez un client" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-gray-800 border-gray-700">
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id} className="text-gray-200">
                    {client.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Titre du document</FormLabel>
            <FormControl>
              <Input 
                placeholder="Entrez le titre du document" 
                {...field}
                className="bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-400"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="file"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Document</FormLabel>
            <FormControl>
              <div className="relative">
                <input
                  type="file"
                  {...field}
                  onChange={(e) => onChange(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full p-8 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors bg-gradient-to-br from-gray-800/30 via-gray-800/20 to-gray-900/30 backdrop-blur-sm group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col items-center space-y-2 relative z-10">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                      <Upload className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300" />
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-indigo-300 transition-colors">
                      {value && value[0] ? value[0].name : "Cliquez pour sélectionner un fichier"}
                    </span>
                  </div>
                </motion.label>
              </div>
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
}
