
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
  salary: string;
}

interface UseEmployeeFormProps {
  employee?: Partial<EmployeeFormData>;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export function useEmployeeForm({ employee, isEditing = false, onSuccess }: UseEmployeeFormProps = {}) {
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
    salary: employee?.salary || "",
  };

  const form = useForm<EmployeeFormData>({ defaultValues });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (isEditing) {
        // Handle update logic for editing existing employee
        // Pour l'instant, nous simulons la mise à jour avec localStorage
        const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        const updatedEmployees = existingEmployees.map((emp: any) => {
          if (emp.id === employee?.id) {
            return {
              ...emp,
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
            };
          }
          return emp;
        });
        
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        
        // Update salary in employee_salaries table if changed
        if (data.salary && data.salary !== employee?.salary) {
          // Convert salary to number and ensure employee_id is a string
          const employeeId = String(employee?.id);
          const salaryData = {
            employee_id: employeeId,
            base_salary: parseFloat(data.salary) || 0
          };

          const { error: salaryError } = await supabase
            .from('employee_salaries')
            .upsert(salaryData);
            
          if (salaryError) {
            console.error("Error updating salary data:", salaryError);
            throw salaryError;
          }
        }
        
        toast.success("Employé mis à jour avec succès");
      } else {
        // Instead of using a non-existent "employees" table, we'll create a custom table structure
        // First, let's create an employee record with a UUID
        const employeeId = crypto.randomUUID();
        
        // Create an object with employee data that we can store in other tables or localStorage
        const employeeData = {
          id: employeeId,
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
        };
        
        // For now, save in localStorage as a workaround
        // In a real app, you would have an appropriate table structure in Supabase
        const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        existingEmployees.push(employeeData);
        localStorage.setItem('employees', JSON.stringify(existingEmployees));
        
        // Still save the salary information to employee_salaries table in Supabase
        if (data.salary) {
          const salaryData = {
            employee_id: employeeId, // Using the string UUID
            base_salary: parseFloat(data.salary) || 0
          };

          const { error: salaryError } = await supabase
            .from('employee_salaries')
            .insert(salaryData);
            
          if (salaryError) {
            console.error("Error saving salary data:", salaryError);
            throw salaryError;
          }
        }
          
        toast.success("Nouvel employé ajouté avec succès");
        console.log("Employee data saved:", employeeData);
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
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
