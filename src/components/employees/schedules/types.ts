
export interface EmployeeShift {
  date: string;
  shift: string;
  status: string;
  overtime?: number; // Nombre d'heures supplémentaires
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  duration: number; // Durée en heures
}

export interface OvertimeRecord {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export interface EmployeeSalary {
  id: string;
  employeeId: string;
  baseSalary: number;
  taxRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryAdvance {
  id: string;
  employeeId: string;
  amount: number;
  date: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface SalesBonus {
  id: string;
  employeeId: string;
  month: string;
  volumeSold: number;
  bonusPerCubicMeter: number;
  totalBonus: number;
  status: "pending" | "calculated" | "paid";
  createdAt: string;
}
