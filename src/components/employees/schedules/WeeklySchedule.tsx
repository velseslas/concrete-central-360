
import { WeeklyScheduleHeader } from "./WeeklyScheduleHeader";
import { WeeklyScheduleGrid } from "./WeeklyScheduleGrid";
import { Employee } from "./types";

interface WeeklyScheduleProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedEmployee: string | undefined;
  setSelectedEmployee: (value: string) => void;
  employees: Employee[];
  getShiftForEmployee: (employeeId: string, date: Date) => any;
  getShiftColorClass: (shift: string) => string;
  getStatusColorClass: (status: string) => string;
}

export function WeeklySchedule({
  selectedDate,
  setSelectedDate,
  selectedEmployee,
  setSelectedEmployee,
  employees,
  getShiftForEmployee,
  getShiftColorClass,
  getStatusColorClass
}: WeeklyScheduleProps) {
  return (
    <div className="space-y-6">
      <WeeklyScheduleHeader 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedEmployee={setSelectedEmployee}
        employees={employees}
      />
      
      <WeeklyScheduleGrid 
        selectedDate={selectedDate}
        selectedEmployee={selectedEmployee}
        employees={employees}
        getShiftForEmployee={getShiftForEmployee}
        getShiftColorClass={getShiftColorClass}
        getStatusColorClass={getStatusColorClass}
      />
    </div>
  );
}
