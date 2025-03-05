
export interface EmployeeShift {
  date: string;
  shift: string;
  status: string;
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
}
