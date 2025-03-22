
import { useState } from "react";
import { EmployeeSalaryManager } from "./salary/EmployeeSalaryManager";
import { Dialog } from "@/components/ui/dialog";
import { Employee } from "./salary/types";
import { Button } from "@/components/ui/button";
import { PaySlipDialog } from "./salary/dialogs/PaySlipDialog";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// Données mockées pour les employés
const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Jean Dupont",
    position: "Chauffeur",
    baseSalary: 45000,
    attendance: 22,
    overtime: 5
  },
  {
    id: "2",
    name: "Marie Lefebvre",
    position: "Commercial",
    baseSalary: 60000,
    attendance: 21,
    salesVolume: 120,
    advances: 10000
  },
  {
    id: "3",
    name: "Ahmed Bensalem",
    position: "Technicien",
    baseSalary: 50000,
    attendance: 20,
    overtime: 8
  }
];

export function EmployeeSalary() {
  const [showPaySlip, setShowPaySlip] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [bonusPerCubicMeter, setBonusPerCubicMeter] = useState("100");
  
  const paySlipRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => paySlipRef.current,
    documentTitle: `Fiche-Paie-${selectedEmployee?.name}-${selectedMonth}`,
    onAfterPrint: () => console.log("Impression terminée")
  });
  
  const handleEmployeeChange = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
    }
  };
  
  return (
    <>
      <EmployeeSalaryManager
        onViewPaySlip={(employee) => {
          setSelectedEmployee(employee);
          setShowPaySlip(true);
        }}
      />
      
      <Dialog open={showPaySlip} onOpenChange={setShowPaySlip}>
        {selectedEmployee && (
          <PaySlipDialog 
            selectedEmployee={selectedEmployee}
            selectedMonth={selectedMonth}
            bonusPerCubicMeter={bonusPerCubicMeter}
            onPrint={handlePrint}
            paySlipRef={paySlipRef}
            allEmployees={mockEmployees}
            onEmployeeChange={handleEmployeeChange}
          />
        )}
      </Dialog>
    </>
  );
}
