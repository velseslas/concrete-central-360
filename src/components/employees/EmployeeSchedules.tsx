
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklySchedule } from "./schedules/WeeklySchedule";
import { AttendanceManagement } from "./schedules/AttendanceManagement";
import { 
  mockEmployees, 
  timeSlots, 
  getShiftForEmployee, 
  getShiftColorClass, 
  getStatusColorClass 
} from "./schedules/scheduleService";

export function EmployeeSchedules() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState("week");
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 bg-gray-700">
          <TabsTrigger value="week">Planning hebdomadaire</TabsTrigger>
          <TabsTrigger value="attendance">Gestion des présences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week" className="space-y-6">
          <WeeklySchedule 
            selectedDate={selectedDate || new Date()}
            setSelectedDate={setSelectedDate as (date: Date) => void}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            employees={mockEmployees}
            getShiftForEmployee={getShiftForEmployee}
            getShiftColorClass={getShiftColorClass}
            getStatusColorClass={getStatusColorClass}
          />
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-6">
          <AttendanceManagement 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            employees={mockEmployees}
            timeSlots={timeSlots}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
