
export interface Employee {
  id: string;
  name: string;
  position: string;
  baseSalary: number;
  attendance: number;
  overtime?: number;
  advances?: number;
  salesVolume?: number;
}

export interface SalaryAdvance {
  id: string;
  employee_id: string;
  employee_name: string;
  date: string;
  amount: number;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface SalesBonus {
  id: string;
  employee_id: string;
  employee_name: string;
  month: string;
  volume_sold: number;
  bonus_per_cubic_meter: number;
  total_bonus: number;
  status: string;
  client_id?: string;
  client_name?: string;
  project_id?: string;
  project_name?: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  client_id: string;
}

export interface SalaryDetails {
  baseSalary: number;
  overtimePay: string;
  salesBonus: string;
  advances: number;
  finalSalary: string;
}
