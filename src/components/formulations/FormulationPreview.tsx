
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
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

  const handlePrint = () => {
    if (!contentRef.current) return;
    window.print();
  };

  const handleDownload = async () => {
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
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
        <style jsx global>{`
          @media print {
            /* Hide everything except for the print content */
            body * {
              visibility: hidden;
            }
            
            /* Hide all Lovable UI elements */
            #lovable-badge-root,
            #lovable-loading-root {
              display: none !important;
            }
            
            /* Hide all UI navigation elements */
            nav, 
            header, 
            .sidebar, 
            .print-buttons, 
            .dialog-header, 
            .dialog-close-button, 
            [data-radix-popper-content-wrapper] {
              display: none !important;
            }
            
            /* Show only the print content */
            .print-content,
            .print-content * {
              visibility: visible;
              position: static !important;
              width: 100% !important;
              height: auto !important;
              overflow: visible !important;
            }

            /* Reset all fixed positioning */
            .DialogContent,
            .DialogOverlay,
            .fixed,
            .inset-0 {
              position: relative !important;
              top: 0 !important;
              left: 0 !important;
              right: auto !important;
              bottom: auto !important;
              transform: none !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
              max-height: none !important;
              max-width: none !important;
              border: none !important;
              background: white !important;
            }
            
            /* Ensure clean page breaks */
            .print-content {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            /* Remove all dialog portal and backdrop styles */
            [data-state="open"] {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
            
            /* Remove any fixed width/height constraints */
            .translate-x-[-50%],
            .translate-y-[-50%] {
              transform: none !important;
            }
          }
        `}</style>
        
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 dialog-header">
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Formulation {formulation.name}
            </DialogTitle>
          </div>
          <div className="flex gap-4 mr-8 print-buttons">
            <Button 
              onClick={handlePrint}
              className="cursor-pointer bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 hover:from-[#9b87f5]/30 hover:to-[#7E69AB]/30 text-[#9b87f5] hover:text-white border border-[#9b87f5]/30"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
            <Button 
              onClick={handleDownload}
              className="cursor-pointer bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 hover:from-[#9b87f5]/30 hover:to-[#7E69AB]/30 text-[#9b87f5] hover:text-white border border-[#9b87f5]/30"
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </DialogHeader>

        <div ref={contentRef} className="bg-white text-black p-8 rounded-lg print-content">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">{formulation.name}</h2>
              <p className="text-gray-600">{formulation.type}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Granulats</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Sable 0/1</p>
                    <p className="font-medium">300 kg/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Sable 0/3</p>
                    <p className="font-medium">400 kg/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Sable 0/4</p>
                    <p className="font-medium">350 kg/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Gravier 3/8</p>
                    <p className="font-medium">500 kg/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Gravier 8/15</p>
                    <p className="font-medium">550 kg/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Gravier 15/25</p>
                    <p className="font-medium">600 kg/m³</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Liants et Additifs</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Ciment</p>
                    <p className="font-medium">350 kg/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Eau</p>
                    <p className="font-medium">175 L/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Adjuvant</p>
                    <p className="font-medium">2.5 kg/m³</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Ratios</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">Poids Total</p>
                    <p className="font-medium">2877.5 kg/m³</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">G/S</p>
                    <p className="font-medium">1.57</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded shadow hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600">E/C</p>
                    <p className="font-medium">0.5</p>
                  </div>
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
