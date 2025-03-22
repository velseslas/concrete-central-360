
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Employee } from "../types";

interface AdvanceDialogProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  advanceAmount: string;
  advanceDescription: string;
  advanceDate: string;
  onEmployeeChange: (employee: Employee | null) => void;
  onAmountChange: (amount: string) => void;
  onDescriptionChange: (desc: string) => void;
  onDateChange: (date: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function AdvanceDialog({
  employees,
  selectedEmployee,
  advanceAmount,
  advanceDescription,
  advanceDate,
  onEmployeeChange,
  onAmountChange,
  onDescriptionChange,
  onDateChange,
  onSubmit,
  onCancel
}: AdvanceDialogProps) {
  return (
    <DialogContent className="bg-gray-800 text-white border-gray-700">
      <DialogHeader>
        <DialogTitle className="text-white">
          Ajouter un acompte
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="employee">Employé</Label>
          <select 
            id="employee"
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
            value={selectedEmployee?.id || ""}
            onChange={(e) => {
              const selected = employees.find(emp => emp.id === e.target.value);
              onEmployeeChange(selected || null);
            }}
          >
            <option value="">Sélectionner un employé</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input 
            id="date" 
            type="date" 
            value={advanceDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Montant (DA)</Label>
          <Input 
            id="amount" 
            type="number" 
            value={advanceAmount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Montant de l'acompte" 
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (optionnelle)</Label>
          <Input 
            id="description" 
            value={advanceDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Raison de l'acompte" 
            className="bg-gray-700 border-gray-600"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          Annuler
        </Button>
        <Button 
          onClick={onSubmit}
          className="bg-[#9b87f5] hover:bg-[#8a76e5]"
        >
          Enregistrer
        </Button>
      </div>
    </DialogContent>
  );
}
