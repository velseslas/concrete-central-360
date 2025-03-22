
import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Employee } from "./types";
import { calculateFinalSalary } from "./salaryUtils";
import { format } from "date-fns";

interface SalaryOverviewTabProps {
  employees: Employee[];
  bonusPerCubicMeter: string;
  onOpenPaySlip: (employee: Employee) => void;
}

export function SalaryOverviewTab({ employees, bonusPerCubicMeter, onOpenPaySlip }: SalaryOverviewTabProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-400" />
          Gestion des salaires
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="text-white">
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Salaire de base</TableHead>
              <TableHead>Jours de présence</TableHead>
              <TableHead>Heures supp.</TableHead>
              <TableHead>Acomptes</TableHead>
              <TableHead>Prime de vente</TableHead>
              <TableHead>Salaire final</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => {
              const salary = calculateFinalSalary(employee, bonusPerCubicMeter);
              return (
                <TableRow key={employee.id} className="border-gray-700">
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.baseSalary} DA</TableCell>
                  <TableCell>{employee.attendance}/22</TableCell>
                  <TableCell>{employee.overtime || 0}h</TableCell>
                  <TableCell className="text-red-400">{employee.advances || 0} DA</TableCell>
                  <TableCell className="text-green-400">
                    {employee.position === "Commercial" ? 
                      `${salary.salesBonus} DA (${employee.salesVolume || 0}m³)` : 
                      "N/A"}
                  </TableCell>
                  <TableCell className="font-bold">{salary.finalSalary} DA</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 bg-gray-700 hover:bg-gray-600"
                      onClick={() => onOpenPaySlip(employee)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Fiche
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
