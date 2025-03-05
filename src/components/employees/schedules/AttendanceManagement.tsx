
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AttendancePanel } from "./AttendancePanel";
import { AttendanceForm } from "./AttendanceForm";
import { Employee, TimeSlot } from "./types";

interface AttendanceManagementProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedEmployee: string | undefined;
  setSelectedEmployee: (id: string) => void;
  employees: Employee[];
  timeSlots: TimeSlot[];
}

export function AttendanceManagement({
  selectedDate,
  setSelectedDate,
  selectedEmployee,
  setSelectedEmployee,
  employees,
  timeSlots
}: AttendanceManagementProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AttendancePanel 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          employees={employees}
        />
        
        <div className="md:col-span-2">
          <div className="bg-gray-700 p-6 rounded-lg h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg">
                {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
              </h3>
              
              <Select>
                <SelectTrigger className="w-[180px] bg-gray-600 border-gray-500">
                  <SelectValue placeholder="Choisir une équipe" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  <SelectItem value="all">Toutes les équipes</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator className="mb-6 bg-gray-600" />
            
            <div className="space-y-4">
              <AttendanceForm 
                selectedDate={selectedDate}
                selectedEmployee={selectedEmployee}
                employees={employees}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
