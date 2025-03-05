
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, Clock, ClockPlus } from "lucide-react";
import { Employee, TimeSlot } from "./types";
import { getTotalOvertimeForEmployee } from "./scheduleService";

interface AttendanceFormProps {
  selectedDate: Date | undefined;
  selectedEmployee: string | undefined;
  employees: Employee[];
  timeSlots: TimeSlot[];
}

export function AttendanceForm({ 
  selectedDate, 
  selectedEmployee, 
  employees,
  timeSlots
}: AttendanceFormProps) {
  const employee = employees.find(e => e.id === selectedEmployee);
  const totalOvertime = selectedEmployee ? getTotalOvertimeForEmployee(selectedEmployee) : 0;
  
  if (!selectedEmployee) {
    return (
      <div className="text-center py-12 text-gray-400">
        Sélectionnez un employé pour gérer sa présence
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-600 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium mb-2">
              {employee?.name}
            </h4>
            <div className="text-sm text-gray-400 mb-4">
              {employee?.position} - {employee?.department}
            </div>
          </div>
          
          {totalOvertime > 0 && (
            <div className="bg-purple-600 px-3 py-2 rounded-md flex items-center gap-2">
              <ClockPlus className="h-4 w-4" />
              <span>{totalOvertime}h supplémentaires</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Horaire</label>
            <Select>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                <SelectValue placeholder="Choisir un horaire" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                {timeSlots.map(slot => (
                  <SelectItem key={slot.id} value={slot.id}>{slot.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Statut de présence</label>
            <Select>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="present">Présent</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">En retard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-1">Notes (optionnel)</label>
          <textarea 
            className="w-full h-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            placeholder="Ajouter des commentaires..."
          />
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button>Enregistrer</Button>
        </div>
      </div>
      
      <div className="bg-gray-600 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Historique de présence</h4>
        
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => {
            const date = addDays(new Date(), -i);
            return (
              <div key={i} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gray-400" />
                  <span>{format(date, "EEE d MMM", { locale: fr })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Matin (6h - 14h)</span>
                  <span className="px-2 py-1 text-xs rounded bg-green-600">Présent</span>
                  {i === 1 && <span className="px-2 py-1 text-xs rounded bg-purple-600">+2h supp.</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
