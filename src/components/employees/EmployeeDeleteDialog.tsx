
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface EmployeeDeleteDialogProps {
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export function EmployeeDeleteDialog({ employee, onConfirm, onCancel }: EmployeeDeleteDialogProps) {
  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center gap-3 text-destructive">
        <AlertTriangle className="h-6 w-6" />
        <h3 className="text-lg font-medium">Confirmation de suppression</h3>
      </div>
      
      <p className="text-gray-300">
        Êtes-vous sûr de vouloir supprimer définitivement l'employé <strong>{employee.firstName} {employee.lastName}</strong> ({employee.position}) ?
      </p>
      
      <p className="text-sm text-gray-400">
        Cette action ne peut pas être annulée et toutes les données associées à cet employé seront perdues.
      </p>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button 
          variant="destructive" 
          onClick={onConfirm}
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
}
