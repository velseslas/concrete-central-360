
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EmployeeFormProps {
  employee?: any;
  isEditing?: boolean;
}

export function EmployeeForm({ employee, isEditing = false }: EmployeeFormProps) {
  const defaultValues = employee ? {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    position: employee.position,
    department: employee.department,
    status: employee.status,
    startDate: employee.startDate,
    address: employee.address || "",
    emergencyContact: employee.emergencyContact || "",
    bankDetails: employee.bankDetails || "",
    nationalId: employee.nationalId || "",
    birthDate: employee.birthDate || "",
    notes: employee.notes || "",
  } : {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    status: "active",
    startDate: new Date().toISOString().split('T')[0],
    address: "",
    emergencyContact: "",
    bankDetails: "",
    nationalId: "",
    birthDate: "",
    notes: "",
  };

  const form = useForm({ defaultValues });

  const onSubmit = (data: any) => {
    if (isEditing) {
      // Handle update logic here
      toast.success("Employé mis à jour avec succès");
    } else {
      // Handle create logic here
      toast.success("Nouvel employé ajouté avec succès");
    }
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-white">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 bg-gray-700">
            <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
            <TabsTrigger value="professional">Informations professionnelles</TabsTrigger>
            <TabsTrigger value="additional">Informations complémentaires</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} className="bg-gray-700 border-gray-600" />
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
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} className="bg-gray-700 border-gray-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} className="bg-gray-700 border-gray-600" />
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
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="+33 6 12 34 56 78" {...field} className="bg-gray-700 border-gray-600" />
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
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adresse complète"
                      className="resize-none bg-gray-700 border-gray-600"
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
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-gray-700 border-gray-600" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="professional" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poste</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Sélectionner un poste" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        <SelectItem value="Chauffeur">Chauffeur</SelectItem>
                        <SelectItem value="Opérateur Centrale">Opérateur Centrale</SelectItem>
                        <SelectItem value="Technicien">Technicien</SelectItem>
                        <SelectItem value="Responsable">Responsable</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Comptable">Comptable</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Département</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Sélectionner un département" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        <SelectItem value="Transport">Transport</SelectItem>
                        <SelectItem value="Production">Production</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="Ventes">Ventes</SelectItem>
                        <SelectItem value="Comptabilité">Comptabilité</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date d'embauche</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-gray-700 border-gray-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d'identité</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro de carte d'identité ou de passeport" {...field} className="bg-gray-700 border-gray-600" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="additional" className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact d'urgence</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nom, relation, numéro de téléphone"
                      className="resize-none bg-gray-700 border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordonnées bancaires</FormLabel>
                  <FormControl>
                    <Input placeholder="IBAN" {...field} className="bg-gray-700 border-gray-600" />
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
                    <Textarea
                      placeholder="Informations supplémentaires"
                      className="resize-none bg-gray-700 border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <Separator className="bg-gray-700" />

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button">Annuler</Button>
          <Button type="submit">{isEditing ? "Mettre à jour" : "Enregistrer"}</Button>
        </div>
      </form>
    </Form>
  );
}
