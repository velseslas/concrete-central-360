
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

// Define the schema for the form
export const employeeSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  address: z.string().optional(),
  birthDate: z.string().optional(),
  position: z.string().min(1, "Le poste est requis"),
  department: z.string().min(1, "Le département est requis"),
  startDate: z.string().min(1, "La date d'embauche est requise"),
  status: z.string().min(1, "Le statut est requis"),
  salary: z.string().min(1, "Le salaire est requis"),
  bankDetails: z.string().optional(),
  emergencyContact: z.string().optional(),
  notes: z.string().optional(),
});

// Export the type for the form data
export type EmployeeFormData = z.infer<typeof employeeSchema>;

interface UseEmployeeFormProps {
  employee?: Partial<EmployeeFormData>;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export const useEmployeeForm = ({ employee, isEditing = false, onSuccess }: UseEmployeeFormProps) => {
  // Initialize the form with the schema and default values
  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      address: employee?.address || "",
      birthDate: employee?.birthDate || "",
      position: employee?.position || "",
      department: employee?.department || "",
      startDate: employee?.startDate || new Date().toISOString().split("T")[0],
      status: employee?.status || "active",
      salary: employee?.salary || "",
      bankDetails: employee?.bankDetails || "",
      emergencyContact: employee?.emergencyContact || "",
      notes: employee?.notes || "",
    },
  });

  const saveToLocalStorage = (formData: EmployeeFormData, employeeId: string = uuidv4()) => {
    // Get existing employees from localStorage
    const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    
    // If editing, update the existing employee
    if (isEditing && employee) {
      const employeeIndex = existingEmployees.findIndex(
        (emp: any) => emp.id === employeeId
      );
      
      if (employeeIndex !== -1) {
        existingEmployees[employeeIndex] = { 
          ...existingEmployees[employeeIndex], 
          ...formData,
          id: employeeId
        };
      }
    } else {
      // Add the new employee
      existingEmployees.push({
        ...formData,
        id: employeeId,
        createdAt: new Date().toISOString()
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('employees', JSON.stringify(existingEmployees));
    
    return employeeId;
  };

  const saveToSupabase = async (formData: EmployeeFormData, employeeId: string) => {
    try {
      // Save the employee salary data
      const { error: salaryError } = await supabase
        .from('employee_salaries')
        .insert({
          employee_id: employeeId,
          base_salary: parseFloat(formData.salary)
        });

      if (salaryError) throw salaryError;
      
      return employeeId;
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      throw error;
    }
  };

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      // First save to localStorage
      const employeeId = saveToLocalStorage(data, isEditing && employee ? (employee as any).id : undefined);
      
      // Then attempt to save to Supabase
      try {
        await saveToSupabase(data, employeeId);
      } catch (error) {
        console.error("Failed to save to Supabase, but data is saved locally:", error);
        // We don't rethrow here since we've already saved to localStorage
      }
      
      toast.success(
        isEditing 
          ? `${data.firstName} ${data.lastName} a été mis à jour` 
          : `${data.firstName} ${data.lastName} a été ajouté`
      );
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement");
    }
  };

  return { form, onSubmit };
};
