import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ProductionReportFiltersProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: string;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onStatusChange: (status: string) => void;
}

export function ProductionReportFilters({
  startDate,
  endDate,
  status,
  onStartDateChange,
  onEndDateChange,
  onStatusChange,
}: ProductionReportFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Date de début</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[240px] justify-start text-left font-normal bg-gray-800/50 border-gray-700"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-blue-400" />
              {startDate ? (
                format(startDate, "d MMMM yyyy", { locale: fr })
              ) : (
                <span className="text-gray-400">Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDateChange}
              initialFocus
              className="bg-gray-900"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Date de fin</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[240px] justify-start text-left font-normal bg-gray-800/50 border-gray-700"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-purple-400" />
              {endDate ? (
                format(endDate, "d MMMM yyyy", { locale: fr })
              ) : (
                <span className="text-gray-400">Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={onEndDateChange}
              initialFocus
              className="bg-gray-900"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Statut</label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full md:w-[240px] bg-gray-800/50 border-gray-700">
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800">
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="in_progress">En cours</SelectItem>
            <SelectItem value="completed">Terminée</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}