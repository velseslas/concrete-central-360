
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { PersonalInfoTab } from "./form/PersonalInfoTab";
import { ProfessionalInfoTab } from "./form/ProfessionalInfoTab";
import { AdditionalInfoTab } from "./form/AdditionalInfoTab";
import { useEmployeeForm, EmployeeFormData } from "./form/useEmployeeForm";

interface EmployeeFormProps {
  employee?: Partial<EmployeeFormData>;
  isEditing?: boolean;
}

export function EmployeeForm({ employee, isEditing = false }: EmployeeFormProps) {
  const { form, onSubmit } = useEmployeeForm({ employee, isEditing });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-white">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 bg-gray-700">
            <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
            <TabsTrigger value="professional">Informations professionnelles</TabsTrigger>
            <TabsTrigger value="additional">Informations complémentaires</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoTab form={form} />
          </TabsContent>

          <TabsContent value="professional">
            <ProfessionalInfoTab form={form} />
          </TabsContent>

          <TabsContent value="additional">
            <AdditionalInfoTab form={form} />
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
