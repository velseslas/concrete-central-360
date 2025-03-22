
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { Employee } from "../../types";

interface PaySlipHeaderProps {
  selectedEmployee: Employee;
  onDownloadPDF: () => void;
  onPrint: () => void;
}

export function PaySlipHeader({
  selectedEmployee,
  onDownloadPDF,
  onPrint
}: PaySlipHeaderProps) {
  return (
    <DialogHeader className="flex flex-row items-center justify-between">
      <DialogTitle className="text-white text-xl">
        Fiche de paie - {selectedEmployee?.name || "Employé"}
      </DialogTitle>
      <div className="flex gap-2 mr-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onDownloadPDF}
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
  );
}
