
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Printer, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Employee } from "../types";
import { calculateFinalSalary } from "../salaryUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface PaySlipDialogProps {
  selectedEmployee: Employee | null;
  selectedMonth: string;
  bonusPerCubicMeter: string;
  onPrint: () => void;
  paySlipRef: React.RefObject<HTMLDivElement>;
  allEmployees?: Employee[];
  onEmployeeChange?: (employeeId: string) => void;
}

export function PaySlipDialog({
  selectedEmployee,
  selectedMonth,
  bonusPerCubicMeter,
  onPrint,
  paySlipRef,
  allEmployees = [],
  onEmployeeChange
}: PaySlipDialogProps) {
  if (!selectedEmployee) return null;
  
  const salary = calculateFinalSalary(selectedEmployee, bonusPerCubicMeter);

  const handleEmployeeChange = (employeeId: string) => {
    if (onEmployeeChange) {
      onEmployeeChange(employeeId);
    }
  };

  const handleDownloadPDF = () => {
    toast.success("Téléchargement de la fiche de paie en cours...");
    const paySlipElement = paySlipRef.current;
    
    if (paySlipElement) {
      html2canvas(paySlipElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Fiche-Paie-${selectedEmployee.name}-${selectedMonth}.pdf`);
      });
    }
  };
  
  return (
    <DialogContent className="bg-gray-800 text-white border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-auto">
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-white text-xl">
          Fiche de paie - {selectedEmployee?.name || "Employé"}
        </DialogTitle>
        <div className="flex gap-2 mr-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleDownloadPDF}
            className="h-8 w-8 bg-gray-700 hover:bg-gray-600"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={onPrint}
            className="h-8 w-8 bg-gray-700 hover:bg-gray-600"
          >
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </DialogHeader>
      
      {allEmployees && allEmployees.length > 0 && onEmployeeChange && (
        <div className="mb-4">
          <Label htmlFor="employee-select" className="block text-sm mb-2">
            Sélectionner un employé
          </Label>
          <Select 
            value={selectedEmployee.id} 
            onValueChange={handleEmployeeChange}
          >
            <SelectTrigger className="w-full bg-gray-700 border-gray-600">
              <SelectValue placeholder="Choisir un employé" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {allEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name} - {employee.position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <ScrollArea className="h-[70vh]">
        <div ref={paySlipRef} className="bg-white text-black p-8 rounded-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="company-info">
              <h1 className="text-2xl font-bold">SARL CIMENTERIE BETONIERE</h1>
              <p>Route De Tébessa, Oum El Bouaghi, Algérie</p>
              <p>RC: 25/00-B-0016017, NIF: 002.5015.36.0598.5099</p>
              <p>Tél: +213 (0) 99 999 9999</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold mb-2">Fiche de paie</h2>
              <p>Mois: {selectedMonth ? format(new Date(selectedMonth), 'MMMM yyyy', { locale: fr }) : ''}</p>
              <p>Date d'émission: {format(new Date(), 'dd/MM/yyyy')}</p>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-300 py-4 my-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="employee-info">
                <h3 className="font-bold">Informations employé</h3>
                <p><span className="font-semibold">Nom:</span> {selectedEmployee?.name}</p>
                <p><span className="font-semibold">Poste:</span> {selectedEmployee?.position}</p>
                <p><span className="font-semibold">Date d'embauche:</span> 01/01/2023</p>
              </div>
              
              <div className="employee-details">
                <h3 className="font-bold">Détails du paiement</h3>
                <p><span className="font-semibold">Jours travaillés:</span> {selectedEmployee?.attendance || 22}/22</p>
                <p><span className="font-semibold">Heures supplémentaires:</span> {selectedEmployee?.overtime || 0}h</p>
                <p><span className="font-semibold">Absences:</span> {selectedEmployee?.absences || 0} jour(s)</p>
              </div>
            </div>
          </div>
          
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-2">Description</th>
                <th className="text-right py-2 px-2">Montant (DA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-2">Salaire de base</td>
                <td className="text-right py-2 px-2">{selectedEmployee.baseSalary.toLocaleString('fr-FR')}</td>
              </tr>
              {(selectedEmployee.overtime || 0) > 0 && (
                <tr>
                  <td className="py-2 px-2">Heures supplémentaires ({selectedEmployee.overtime}h)</td>
                  <td className="text-right py-2 px-2">{parseInt(salary.overtimePay).toLocaleString('fr-FR')}</td>
                </tr>
              )}
              {selectedEmployee.position === "Commercial" && (selectedEmployee.salesVolume || 0) > 0 && (
                <tr>
                  <td className="py-2 px-2">Prime de vente ({selectedEmployee.salesVolume} m³ × {bonusPerCubicMeter} DA)</td>
                  <td className="text-right py-2 px-2">{parseInt(salary.salesBonus).toLocaleString('fr-FR')}</td>
                </tr>
              )}
              {(selectedEmployee.absences || 0) > 0 && (
                <tr>
                  <td className="py-2 px-2 text-red-500">Déduction absences ({selectedEmployee.absences} jour(s))</td>
                  <td className="text-right py-2 px-2 text-red-500">-{salary.absencesDeduction.toLocaleString('fr-FR')}</td>
                </tr>
              )}
              {(selectedEmployee.advances || 0) > 0 && (
                <tr>
                  <td className="py-2 px-2 text-red-500">Acomptes</td>
                  <td className="text-right py-2 px-2 text-red-500">-{selectedEmployee.advances.toLocaleString('fr-FR')}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-300">
                <td className="py-2 px-2 font-bold">Total Net à Payer</td>
                <td className="text-right py-2 px-2 font-bold">
                  {parseInt(salary.finalSalary).toLocaleString('fr-FR')} DA
                </td>
              </tr>
            </tfoot>
          </table>
          
          <div className="mt-8 text-sm">
            <p className="mb-2">
              <span className="font-semibold">Mode de paiement:</span> Virement bancaire
            </p>
            <p className="mb-4">
              <span className="font-semibold">Date de paiement:</span> {format(new Date(), 'dd/MM/yyyy')}
            </p>
            
            <div className="border-t border-gray-300 pt-4 mt-4 text-center">
              <p>Ce document tient lieu de reçu de paiement.</p>
              <p className="mt-2">SARL CIMENTERIE BETONIERE</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
