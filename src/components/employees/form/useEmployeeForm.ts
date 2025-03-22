
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
        const { data: employeeData, error: employeeError } = await supabase
          .from('employees')
          .insert({
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            position: data.position,
            department: data.department,
            status: data.status,
            start_date: data.startDate,
            address: data.address,
            emergency_contact: data.emergencyContact,
            bank_details: data.bankDetails,
            national_id: data.nationalId,
            birth_date: data.birthDate,
            notes: data.notes
          })
          .select()
          .single();
        
        if (employeeError) throw employeeError;
        
        if (employeeData && data.salary) {
          const salaryData = {
            employee_id: employeeData.id,
            base_salary: parseFloat(data.salary) || 0
          };

          const { error: salaryError } = await supabase
            .from('employee_salaries')
            .insert(salaryData);
            
          if (salaryError) console.error("Error saving salary data:", salaryError);
        }
          
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
