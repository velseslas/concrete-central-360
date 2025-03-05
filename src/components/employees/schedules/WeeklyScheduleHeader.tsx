
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WeeklyScheduleHeaderProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setSelectedEmployee: (value: string) => void;
  employees: Array<{ id: string; name: string }>;
}

export function WeeklyScheduleHeader({
  selectedDate,
  setSelectedDate,
  setSelectedEmployee,
  employees
}: WeeklyScheduleHeaderProps) {
  const startOfCurrentWeek = startOfWeek(selectedDate || new Date(), { weekStartsOn: 1 });

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setSelectedDate(addDays(selectedDate || new Date(), -7))}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-lg font-medium">
          {format(startOfCurrentWeek, "d MMMM", { locale: fr })} - {format(addDays(startOfCurrentWeek, 6), "d MMMM yyyy", { locale: fr })}
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setSelectedDate(addDays(selectedDate || new Date(), 7))}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Select onValueChange={(value) => setSelectedEmployee(value)}>
        <SelectTrigger className="w-full md:w-[200px] bg-gray-700 border-gray-600 text-white">
          <SelectValue placeholder="Filtrer par employé" />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600 text-white">
          <SelectItem value="all">Tous les employés</SelectItem>
          {employees.map(employee => (
            <SelectItem key={employee.id} value={employee.id}>{employee.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
