
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

interface FormulationPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formulation: any;
}

export function FormulationPreview({ open, onOpenChange, formulation }: FormulationPreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!formulation) return null;

  const handlePrint = async () => {
    if (!contentRef.current) return;

    try {
      const content = contentRef.current;
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`formulation-${formulation.name}.pdf`);
    } catch (error) {
      console.error("Erreur lors de l'impression:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Formulation {formulation.name}
          </DialogTitle>
          <Button 
            onClick={handlePrint}
            className="cursor-pointer bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 hover:text-white border border-blue-500/30"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </DialogHeader>

        <div ref={contentRef} className="bg-white text-black p-8 rounded-lg">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">{formulation.name}</h2>
              <p className="text-gray-600">{formulation.type}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">Informations Générales</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Résistance:</span> {formulation.resistance}</p>
                  <p><span className="font-medium">Statut:</span> {formulation.status}</p>
                  <p><span className="font-medium">Dernière modification:</span> {formulation.lastModified}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 text-center">
                Document généré le {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
