
import { EmployeeShift, Employee } from "./types";

// Mock data for shifts
const mockShifts: Record<string, EmployeeShift[]> = {
  "1": [
    { date: "2023-05-01", shift: "morning", status: "present" },
    { date: "2023-05-02", shift: "morning", status: "present" },
    { date: "2023-05-03", shift: "afternoon", status: "present" },
    { date: "2023-05-04", shift: "morning", status: "present" },
    { date: "2023-05-05", shift: "morning", status: "absent" },
  ],
  "2": [
    { date: "2023-05-01", shift: "afternoon", status: "present" },
    { date: "2023-05-02", shift: "afternoon", status: "present" },
    { date: "2023-05-03", shift: "morning", status: "present" },
    { date: "2023-05-04", shift: "afternoon", status: "present" },
    { date: "2023-05-05", shift: "afternoon", status: "present" },
  ],
  "3": [
    { date: "2023-05-01", shift: "morning", status: "present" },
    { date: "2023-05-02", shift: "morning", status: "present" },
    { date: "2023-05-03", shift: "morning", status: "absent" },
    { date: "2023-05-04", shift: "morning", status: "present" },
    { date: "2023-05-05", shift: "morning", status: "present" },
  ],
  "4": [
    { date: "2023-05-01", shift: "morning", status: "present" },
    { date: "2023-05-02", shift: "morning", status: "present" },
    { date: "2023-05-03", shift: "morning", status: "present" },
    { date: "2023-05-04", shift: "morning", status: "present" },
    { date: "2023-05-05", shift: "morning", status: "present" },
  ],
  "5": [
    { date: "2023-05-01", shift: "afternoon", status: "present" },
    { date: "2023-05-02", shift: "afternoon", status: "present" },
    { date: "2023-05-03", shift: "afternoon", status: "present" },
    { date: "2023-05-04", shift: "afternoon", status: "absent" },
    { date: "2023-05-05", shift: "afternoon", status: "present" },
  ],
};

// Mock data for employees
export const mockEmployees: Employee[] = [
  { id: "1", name: "Jean Dupont", position: "Chauffeur", department: "Transport" },
  { id: "2", name: "Marie Lefebvre", position: "Opérateur Centrale", department: "Production" },
  { id: "3", name: "Ahmed Bensalem", position: "Technicien", department: "Maintenance" },
  { id: "4", name: "Sophie Mercier", position: "Responsable", department: "Administration" },
  { id: "5", name: "Thomas Bernard", position: "Commercial", department: "Ventes" },
];

// Mock data for time slots
export const timeSlots = [
  { id: "morning", label: "Matin (6h - 14h)" },
  { id: "afternoon", label: "Après-midi (14h - 22h)" },
  { id: "night", label: "Nuit (22h - 6h)" },
  { id: "dayoff", label: "Jour de repos" },
];

export const getShiftForEmployee = (employeeId: string, date: Date): EmployeeShift | null => {
  const formattedDate = date.toISOString().split('T')[0];
  const employeeShifts = mockShifts[employeeId as keyof typeof mockShifts] || [];
  const shift = employeeShifts.find(s => s.date === formattedDate);
  return shift || null;
};

export const getShiftColorClass = (shift: string): string => {
  switch (shift) {
    case "morning":
      return "bg-blue-600";
    case "afternoon":
      return "bg-purple-600";
    case "night":
      return "bg-indigo-600";
    case "dayoff":
      return "bg-gray-600";
    default:
      return "bg-gray-500";
  }
};

export const getStatusColorClass = (status: string): string => {
  switch (status) {
    case "present":
      return "bg-green-600";
    case "absent":
      return "bg-red-600";
    case "late":
      return "bg-yellow-600";
    default:
      return "bg-gray-500";
  }
};
