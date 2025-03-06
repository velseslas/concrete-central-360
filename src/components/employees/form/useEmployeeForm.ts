
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: string;
  startDate: string;
  address: string;
  emergencyContact: string;
  bankDetails: string;
  nationalId: string;
  birthDate: string;
  notes: string;
  salary: string; // Added salary field
}

interface UseEmployeeFormProps {
  employee?: Partial<EmployeeFormData>;
  isEditing?: boolean;
}

export function useEmployeeForm({ employee, isEditing = false }: UseEmployeeFormProps = {}) {
  const defaultValues: EmployeeFormData = {
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    position: employee?.position || "",
    department: employee?.department || "",
    status: employee?.status || "active",
    startDate: employee?.startDate || new Date().toISOString().split('T')[0],
    address: employee?.address || "",
    emergencyContact: employee?.emergencyContact || "",
    bankDetails: employee?.bankDetails || "",
    nationalId: employee?.nationalId || "",
    birthDate: employee?.birthDate || "",
    notes: employee?.notes || "",
    salary: employee?.salary || "", // Default value for salary
  };

  const form = useForm<EmployeeFormData>({ defaultValues });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (isEditing) {
        // Handle update logic here
        toast.success("Employé mis à jour avec succès");
      } else {
        // Handle create logic here
        // Also save the salary information to employee_salaries table
        const salaryData = {
          employee_id: `${data.firstName} ${data.lastName}`, // Using name as a simplistic ID
          base_salary: parseFloat(data.salary) || 0
        };

        await supabase
          .from('employee_salaries')
          .insert(salaryData);
          
        toast.success("Nouvel employé ajouté avec succès");
      }
      console.log(data);
    } catch (error) {
      console.error("Error saving employee data:", error);
      toast.error("Erreur lors de l'enregistrement des données de l'employé");
    }
  };

  return {
    form,
    onSubmit,
  };
}
