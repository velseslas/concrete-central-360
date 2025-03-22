
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Employee } from "../../types";
import { SalaryDetails } from "../../types";
import React from "react";
import { PaySlipTable } from "./PaySlipTable";

interface PaySlipContentProps {
  paySlipRef: React.RefObject<HTMLDivElement>;
  selectedEmployee: Employee;
  selectedMonth: string;
  salary: SalaryDetails;
  bonusPerCubicMeter: string;
  allEmployees?: Employee[];
  onEmployeeChange?: (employeeId: string) => void;
}

export function PaySlipContent({
  paySlipRef,
  selectedEmployee,
  selectedMonth,
  salary,
  bonusPerCubicMeter,
  allEmployees = [],
  onEmployeeChange
}: PaySlipContentProps) {
  const handleEmployeeChange = (employeeId: string) => {
    if (onEmployeeChange) {
      onEmployeeChange(employeeId);
    }
  };

  return (
    <>
      {allEmployees && allEmployees.length > 0 && onEmployeeChange && (
        <div className="mb-4">
          <Label htmlFor="employee-select" className="block text-sm mb-2">
            Sélectionner un employé
          </Label>
          <Select 
            value={selectedEmployee.id} 
            onValueChange={handleEmployeeChange}
          >
            <SelectTrigger className="w-full bg-gray-700 border-gray-600">
              <SelectValue placeholder="Choisir un employé" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {allEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name} - {employee.position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <ScrollArea className="h-[70vh]">
        <div ref={paySlipRef} className="bg-white text-black p-8 rounded-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="company-info">
              <h1 className="text-2xl font-bold">SARL CIMENTERIE BETONIERE</h1>
              <p>Route De Tébessa, Oum El Bouaghi, Algérie</p>
              <p>RC: 25/00-B-0016017, NIF: 002.5015.36.0598.5099</p>
              <p>Tél: +213 (0) 99 999 9999</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold mb-2">Fiche de paie</h2>
              <p>Mois: {selectedMonth ? format(new Date(selectedMonth), 'MMMM yyyy', { locale: fr }) : ''}</p>
              <p>Date d'émission: {format(new Date(), 'dd/MM/yyyy')}</p>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-300 py-4 my-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="employee-info">
                <h3 className="font-bold">Informations employé</h3>
                <p><span className="font-semibold">Nom:</span> {selectedEmployee?.name}</p>
                <p><span className="font-semibold">Poste:</span> {selectedEmployee?.position}</p>
                <p><span className="font-semibold">Date d'embauche:</span> 01/01/2023</p>
              </div>
              
              <div className="employee-details">
                <h3 className="font-bold">Détails du paiement</h3>
                <p><span className="font-semibold">Jours travaillés:</span> {selectedEmployee?.attendance || 22}/22</p>
                <p><span className="font-semibold">Heures supplémentaires:</span> {selectedEmployee?.overtime || 0}h</p>
                <p><span className="font-semibold">Absences:</span> {selectedEmployee?.absences || 0} jour(s)</p>
              </div>
            </div>
          </div>
          
          <PaySlipTable 
            selectedEmployee={selectedEmployee}
            salary={salary}
            bonusPerCubicMeter={bonusPerCubicMeter}
          />
          
          <div className="mt-8 text-sm">
            <p className="mb-2">
              <span className="font-semibold">Mode de paiement:</span> Virement bancaire
            </p>
            <p className="mb-4">
              <span className="font-semibold">Date de paiement:</span> {format(new Date(), 'dd/MM/yyyy')}
            </p>
            
            <div className="border-t border-gray-300 pt-4 mt-4 text-center">
              <p>Ce document tient lieu de reçu de paiement.</p>
              <p className="mt-2">SARL CIMENTERIE BETONIERE</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
