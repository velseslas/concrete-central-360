
import React from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { User } from "lucide-react";
import { ScheduleCell } from "./ScheduleCell";
import { Employee } from "./types";

interface WeeklyScheduleGridProps {
  selectedDate: Date;
  selectedEmployee: string | undefined;
  employees: Employee[];
  getShiftForEmployee: (employeeId: string, date: Date) => any;
  getShiftColorClass: (shift: string) => string;
  getStatusColorClass: (status: string) => string;
}

export function WeeklyScheduleGrid({
  selectedDate,
  selectedEmployee,
  employees,
  getShiftForEmployee,
  getShiftColorClass,
  getStatusColorClass
}: WeeklyScheduleGridProps) {
  const startOfCurrentWeek = startOfWeek(selectedDate || new Date(), { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  const filteredEmployees = selectedEmployee 
    ? employees.filter(e => e.id === selectedEmployee)
    : employees;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 gap-1">
          <div className="bg-gray-900 p-3 rounded-tl-md font-medium"></div>
          {daysOfWeek.map((day, index) => (
            <div 
              key={index} 
              className={`bg-gray-900 p-3 font-medium text-center ${index === 6 ? 'rounded-tr-md' : ''}`}
            >
              <div>{format(day, "EEE", { locale: fr })}</div>
              <div className="text-sm text-gray-400">{format(day, "d MMM", { locale: fr })}</div>
            </div>
          ))}
          
          {filteredEmployees.map((employee) => (
            <React.Fragment key={employee.id}>
              <div className="bg-gray-700 p-3 font-medium flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-white">{employee.name}</div>
                  <div className="text-xs text-gray-400">{employee.position}</div>
                </div>
              </div>
              
              {daysOfWeek.map((day, dayIndex) => {
                const shift = getShiftForEmployee(employee.id, day);
                return (
                  <div 
                    key={dayIndex} 
                    className={`bg-gray-700 p-3 text-center ${dayIndex === 6 ? 'rounded-tr-md' : ''}`}
                  >
                    <ScheduleCell 
                      shift={shift}
                      getShiftColorClass={getShiftColorClass}
                      getStatusColorClass={getStatusColorClass}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
