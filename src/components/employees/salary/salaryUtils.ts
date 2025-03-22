
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Employee, SalaryDetails } from "./types";

export const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
  } catch (e) {
    return dateString;
  }
};

export const calculateFinalSalary = (employee: Employee, bonusPerCubicMeter: string): SalaryDetails => {
  const baseSalary = employee.baseSalary;
  const overtimeHours = employee.overtime || 0;
  const overtimeRate = 1.25;
  const hourlyRate = baseSalary / 160;
  const overtimePay = overtimeHours * hourlyRate * overtimeRate;
  
  const advances = employee.advances || 0;
  
  // Calculate absence deduction (if any)
  const absences = employee.absences || 0;
  const dailyRate = baseSalary / 22; // Assuming 22 working days per month
  const absencesDeduction = absences * dailyRate;
  
  let salesBonus = 0;
  if (employee.position === "Commercial" && employee.salesVolume) {
    salesBonus = employee.salesVolume * parseFloat(bonusPerCubicMeter);
  }
  
  const finalSalary = baseSalary + overtimePay + salesBonus - advances - absencesDeduction;
  
  return {
    baseSalary,
    overtimePay: overtimePay.toFixed(2),
    salesBonus: salesBonus.toFixed(2),
    advances,
    absencesDeduction,
    finalSalary: finalSalary.toFixed(2)
  };
};
