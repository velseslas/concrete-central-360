
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
