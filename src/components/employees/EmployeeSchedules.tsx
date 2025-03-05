
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fr } from "date-fns/locale";
import { addDays, format, startOfWeek } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";

// Mock data for employees and schedules
const mockEmployees = [
  { id: "1", name: "Jean Dupont", position: "Chauffeur", department: "Transport" },
  { id: "2", name: "Marie Lefebvre", position: "Opérateur Centrale", department: "Production" },
  { id: "3", name: "Ahmed Bensalem", position: "Technicien", department: "Maintenance" },
  { id: "4", name: "Sophie Mercier", position: "Responsable", department: "Administration" },
  { id: "5", name: "Thomas Bernard", position: "Commercial", department: "Ventes" },
];

// Mock data for shifts
const mockShifts = {
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

const timeSlots = [
  { id: "morning", label: "Matin (6h - 14h)" },
  { id: "afternoon", label: "Après-midi (14h - 22h)" },
  { id: "night", label: "Nuit (22h - 6h)" },
  { id: "dayoff", label: "Jour de repos" },
];

export function EmployeeSchedules() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState("week");
  
  const startOfCurrentWeek = startOfWeek(selectedDate || new Date(), { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  const getShiftColorClass = (shift: string) => {
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
  
  const getStatusColorClass = (status: string) => {
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
  
  const getShiftForEmployee = (employeeId: string, date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const employeeShifts = mockShifts[employeeId as keyof typeof mockShifts] || [];
    const shift = employeeShifts.find(s => s.date === formattedDate);
    return shift;
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 bg-gray-700">
          <TabsTrigger value="week">Planning hebdomadaire</TabsTrigger>
          <TabsTrigger value="attendance">Gestion des présences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week" className="space-y-6">
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
                {mockEmployees.map(employee => (
                  <SelectItem key={employee.id} value={employee.id}>{employee.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
                
                {(selectedEmployee ? [mockEmployees.find(e => e.id === selectedEmployee)] : mockEmployees).filter(Boolean).map((employee) => (
                  <React.Fragment key={employee?.id}>
                    <div className="bg-gray-700 p-3 font-medium flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <div>
                        <div className="text-white">{employee?.name}</div>
                        <div className="text-xs text-gray-400">{employee?.position}</div>
                      </div>
                    </div>
                    
                    {daysOfWeek.map((day, dayIndex) => {
                      const shift = employee ? getShiftForEmployee(employee.id, day) : null;
                      return (
                        <div 
                          key={dayIndex} 
                          className={`bg-gray-700 p-3 text-center ${dayIndex === 6 ? 'rounded-tr-md' : ''}`}
                        >
                          {shift ? (
                            <div className="flex flex-col gap-1 items-center">
                              <span className={`px-2 py-1 rounded text-xs ${getShiftColorClass(shift.shift)}`}>
                                {shift.shift === 'morning' ? 'Matin' : 
                                 shift.shift === 'afternoon' ? 'Après-midi' : 
                                 shift.shift === 'night' ? 'Nuit' : 'Repos'}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColorClass(shift.status)}`}>
                                {shift.status === 'present' ? 'Présent' : 
                                 shift.status === 'absent' ? 'Absent' : 
                                 shift.status === 'late' ? 'En retard' : 'Non défini'}
                              </span>
                            </div>
                          ) : (
                            <button className="text-sm text-gray-400 hover:text-white">
                              + Ajouter
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  {mockEmployees.map(employee => (
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
                  {selectedEmployee ? (
                    <div>
                      <div className="bg-gray-600 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">
                          {mockEmployees.find(e => e.id === selectedEmployee)?.name}
                        </h4>
                        <div className="text-sm text-gray-400 mb-4">
                          {mockEmployees.find(e => e.id === selectedEmployee)?.position} - {mockEmployees.find(e => e.id === selectedEmployee)?.department}
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
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      Sélectionnez un employé pour gérer sa présence
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
