
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const filterSchema = z.object({
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  minAmount: z.string().optional(),
  maxAmount: z.string().optional(),
  supplier: z.string().optional(),
  category: z.string().optional(),
  searchTerm: z.string().optional(),
});

export function ExpenseFilters() {
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      searchTerm: "",
      category: "",
      supplier: "",
      minAmount: "",
      maxAmount: "",
    },
  });

  function onSubmit(values: z.infer<typeof filterSchema>) {
    console.log(values);
    // Implement filter logic
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-lg">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par description, fournisseur..."
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white"
                    {...form.register("searchTerm")}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="dateFrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">Date début</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal bg-gray-700/50 border-gray-600 text-gray-300",
                              !field.value && "text-gray-400"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          locale={fr}
                          className="bg-gray-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateTo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">Date fin</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal bg-gray-700/50 border-gray-600 text-gray-300",
                              !field.value && "text-gray-400"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          locale={fr}
                          className="bg-gray-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-300">
                          <SelectValue placeholder="Toutes les catégories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        <SelectItem value="general">Achats généraux</SelectItem>
                        <SelectItem value="vehicles">Parc roulant</SelectItem>
                        <SelectItem value="concrete">Centrale à béton</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Fournisseur</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-300">
                          <SelectValue placeholder="Tous les fournisseurs" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="all">Tous les fournisseurs</SelectItem>
                        <SelectItem value="supplier1">Fournisseur A</SelectItem>
                        <SelectItem value="supplier2">Fournisseur B</SelectItem>
                        <SelectItem value="supplier3">Fournisseur C</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="minAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Montant min (DA)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        className="bg-gray-700/50 border-gray-600 text-white"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maxAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Montant max (DA)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-gray-700/50 border-gray-600 text-white"
                        placeholder="1000000"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700"
              >
                <X className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
              <Button type="submit" className="bg-[#9b87f5] hover:bg-[#8a76e5]">
                Appliquer les filtres
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
