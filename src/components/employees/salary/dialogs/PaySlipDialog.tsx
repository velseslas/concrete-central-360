
import { DialogContent } from "@/components/ui/dialog";
import { Employee } from "../types";
import { calculateFinalSalary } from "../salaryUtils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { PaySlipHeader } from "./components/PaySlipHeader";
import { PaySlipContent } from "./components/PaySlipContent";

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
      <PaySlipHeader 
        selectedEmployee={selectedEmployee}
        onDownloadPDF={handleDownloadPDF}
        onPrint={onPrint}
      />
      
      <PaySlipContent
        paySlipRef={paySlipRef}
        selectedEmployee={selectedEmployee}
        selectedMonth={selectedMonth}
        salary={salary}
        bonusPerCubicMeter={bonusPerCubicMeter}
        allEmployees={allEmployees}
        onEmployeeChange={onEmployeeChange}
      />
    </DialogContent>
  );
}
