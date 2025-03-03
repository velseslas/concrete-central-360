
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
        <style dangerouslySetInnerHTML={{ __html: `
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
              color: black !important;
              position: static !important;
              width: 100% !important;
              height: auto !important;
              overflow: visible !important;
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
              top: 0 !important;
              left: 0 !important;
              transform: none !important;
              box-shadow: none !important;
              border: none !important;
            }
            
            /* Ensure proper positioning and scaling for print */
            .print-content {
              display: block !important;
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 20px !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              page-break-inside: avoid !important;
              page-break-before: avoid !important;
              page-break-after: avoid !important;
            }
            
            /* Reset all Dialog styles that might affect print layout */
            .DialogContent,
            .DialogOverlay,
            .fixed,
            .inset-0 {
              position: static !important;
              transform: none !important;
              width: 100% !important;
              height: auto !important;
              max-height: none !important;
              max-width: none !important;
              overflow: visible !important;
              background: white !important;
            }
            
            /* Improve grid layout for print */
            .grid {
              display: block !important;
              width: 100% !important;
            }
            
            /* Make cards display as inline-blocks for better print layout */
            .grid > div {
              display: inline-block !important;
              width: 45% !important;
              margin: 0.5em 2% !important;
              page-break-inside: avoid !important;
            }
            
            /* Remove transformations that can cause duplication */
            .translate-x-[-50%],
            .translate-y-[-50%] {
              transform: none !important;
            }
          }
        `}} />
        
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
          <div className="space-y-4 max-w-[700px] mx-auto">
            <div className="border-b pb-3">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{formulation.name}</h2>
              <p className="text-gray-600 text-sm">{formulation.type}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-md">Granulats</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-[#F1F0FB] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Sable 0/1</p>
                    <p className="font-medium text-sm">300 kg/m³</p>
                  </div>
                  <div className="p-2 bg-[#F1F0FB] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Sable 0/3</p>
                    <p className="font-medium text-sm">400 kg/m³</p>
                  </div>
                  <div className="p-2 bg-[#F1F0FB] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Sable 0/4</p>
                    <p className="font-medium text-sm">350 kg/m³</p>
                  </div>
                  <div className="p-2 bg-[#F1F0FB] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Gravier 3/8</p>
                    <p className="font-medium text-sm">500 kg/m³</p>
                  </div>
                  <div className="p-2 bg-[#F1F0FB] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Gravier 8/15</p>
                    <p className="font-medium text-sm">550 kg/m³</p>
                  </div>
                  <div className="p-2 bg-[#F1F0FB] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Gravier 15/25</p>
                    <p className="font-medium text-sm">600 kg/m³</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-md">Liants et Additifs</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-[#E5DEFF] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Ciment</p>
                    <p className="font-medium text-sm">350 kg/m³</p>
                  </div>
                  <div className="p-2 bg-[#E5DEFF] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Eau</p>
                    <p className="font-medium text-sm">175 L/m³</p>
                  </div>
                  <div className="p-2 bg-[#E5DEFF] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Adjuvant</p>
                    <p className="font-medium text-sm">2.5 kg/m³</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-md">Ratios</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-[#D3E4FD] rounded shadow-sm">
                    <p className="text-xs text-gray-600">Poids Total</p>
                    <p className="font-medium text-sm">2877.5 kg/m³</p>
                  </div>
                  <div className="p-2 bg-[#D3E4FD] rounded shadow-sm">
                    <p className="text-xs text-gray-600">G/S</p>
                    <p className="font-medium text-sm">1.57</p>
                  </div>
                  <div className="p-2 bg-[#D3E4FD] rounded shadow-sm">
                    <p className="text-xs text-gray-600">E/C</p>
                    <p className="font-medium text-sm">0.5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-3 mt-4">
              <p className="text-xs text-gray-500 text-center">
                Document généré le {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
