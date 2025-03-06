
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  };

  const form = useForm<EmployeeFormData>({ defaultValues });

  const onSubmit = (data: EmployeeFormData) => {
    if (isEditing) {
      // Handle update logic here
      toast.success("Employé mis à jour avec succès");
    } else {
      // Handle create logic here
      toast.success("Nouvel employé ajouté avec succès");
    }
    console.log(data);
  };

  return {
    form,
    onSubmit,
  };
}
