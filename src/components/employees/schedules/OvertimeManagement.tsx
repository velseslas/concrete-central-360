
import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AttendancePanel } from "./AttendancePanel";
import { Employee, OvertimeRecord } from "./types";
import { toast } from "sonner";

interface OvertimeManagementProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedEmployee: string | undefined;
  setSelectedEmployee: (id: string) => void;
  employees: Employee[];
}

// Données fictives pour les heures supplémentaires
const mockOvertimeRecords: OvertimeRecord[] = [
  { id: "1", employeeId: "1", date: "2023-05-01", hours: 2, reason: "Livraison urgente", status: "approved" },
  { id: "2", employeeId: "1", date: "2023-05-03", hours: 1.5, reason: "Maintenance imprévue", status: "approved" },
  { id: "3", employeeId: "2", date: "2023-05-02", hours: 3, reason: "Commande spéciale", status: "pending" },
  { id: "4", employeeId: "3", date: "2023-05-04", hours: 2, reason: "Inventaire", status: "rejected" },
];

export function OvertimeManagement({
  selectedDate,
  setSelectedDate,
  selectedEmployee,
  setSelectedEmployee,
  employees
}: OvertimeManagementProps) {
  const [hours, setHours] = useState<string>("1");
  const [reason, setReason] = useState<string>("");
  
  const filteredRecords = selectedEmployee 
    ? mockOvertimeRecords.filter(record => record.employeeId === selectedEmployee)
    : [];
  
  const employee = employees.find(e => e.id === selectedEmployee);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedDate) {
      toast.error("Veuillez sélectionner un employé et une date");
      return;
    }
    
    if (!hours || isNaN(parseFloat(hours)) || parseFloat(hours) <= 0) {
      toast.error("Veuillez entrer un nombre d'heures valide");
      return;
    }
    
    if (!reason.trim()) {
      toast.error("Veuillez indiquer une raison");
      return;
    }
    
    // Simuler l'ajout d'heures supplémentaires
    toast.success("Heures supplémentaires enregistrées avec succès");
    setHours("1");
    setReason("");
  };
  
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case "approved":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      case "pending":
        return "bg-yellow-600";
      default:
        return "bg-gray-500";
    }
  };
  
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "approved":
        return "Approuvé";
      case "rejected":
        return "Refusé";
      case "pending":
        return "En attente";
      default:
        return "Inconnu";
    }
  };
  
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
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="rejected">Refusé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator className="mb-6 bg-gray-600" />
            
            {!selectedEmployee ? (
              <div className="text-center py-12 text-gray-400">
                Sélectionnez un employé pour gérer ses heures supplémentaires
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-600 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">
                    {employee?.name}
                  </h4>
                  <div className="text-sm text-gray-400 mb-4">
                    {employee?.position} - {employee?.department}
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Nombre d'heures</label>
                        <Input
                          type="number"
                          min="0.5"
                          step="0.5"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full bg-gray-700 border-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Date</label>
                        <Input
                          type="date"
                          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                          disabled
                          className="w-full bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Raison</label>
                      <Textarea 
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full h-20 bg-gray-700 border-gray-600 text-white"
                        placeholder="Raison des heures supplémentaires..."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Enregistrer
                      </Button>
                    </div>
                  </form>
                </div>
                
                <div className="bg-gray-600 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Historique des heures supplémentaires</h4>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" />
                      Actualiser
                    </Button>
                  </div>
                  
                  {filteredRecords.length === 0 ? (
                    <div className="text-center py-6 text-gray-400">
                      Aucune heure supplémentaire enregistrée
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredRecords.map((record) => (
                        <div key={record.id} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <div>{format(new Date(record.date), "d MMM yyyy", { locale: fr })}</div>
                              <div className="text-sm text-gray-400">{record.hours} heure(s) - {record.reason}</div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded ${getStatusColorClass(record.status)}`}>
                            {getStatusLabel(record.status)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
