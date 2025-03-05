
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { User } from "lucide-react";
import { Employee } from "./types";

interface AttendancePanelProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedEmployee: string | undefined;
  setSelectedEmployee: (id: string) => void;
  employees: Employee[];
}

export function AttendancePanel({
  selectedDate,
  setSelectedDate,
  selectedEmployee,
  setSelectedEmployee,
  employees
}: AttendancePanelProps) {
  return (
    <div className="md:col-span-1 space-y-4">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-4">Choisir une date</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="bg-gray-700 text-white"
          locale={fr}
        />
      </div>
      
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-4">Employés</h3>
        <div className="space-y-2">
          {employees.map(employee => (
            <button
              key={employee.id}
              className={`w-full text-left px-3 py-2 rounded ${selectedEmployee === employee.id ? 'bg-primary text-white' : 'hover:bg-gray-600'}`}
              onClick={() => setSelectedEmployee(employee.id)}
            >
              <div className="font-medium">{employee.name}</div>
              <div className="text-sm text-gray-400">{employee.position}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
