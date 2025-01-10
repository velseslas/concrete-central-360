import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface QuotePrintPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: {
    id: string;
    client: string;
    amount: string;
    date: string;
    status: string;
    description?: string;
    validUntil?: string;
  } | null;
}

export function QuotePrintPreview({ open, onOpenChange, quote }: QuotePrintPreviewProps) {
  const handlePrint = () => {
    console.log("Impression du devis:", quote?.id);
    window.print();
    toast.success("Impression lancée");
  };

  const handleDownload = async () => {
    if (!quote) return;
    
    console.log("Téléchargement du devis:", quote.id);
    
    try {
      const element = document.getElementById('quote-preview');
      if (!element) return;

      const canvas = await html2canvas(element);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      
      pdf.save(`devis-${quote.id}.pdf`);
      toast.success("Devis téléchargé avec succès");
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast.error("Erreur lors du téléchargement du devis");
    }
  };

  if (!quote) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Aperçu du Devis {quote.id}</DialogTitle>
          <DialogDescription>
            Prévisualisez, imprimez ou téléchargez le devis
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end gap-4 mb-4">
          <Button onClick={handleDownload} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Télécharger PDF
          </Button>
          <Button onClick={handlePrint} variant="default">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>

        <div id="quote-preview" className="bg-white p-8 rounded-lg shadow">
          <div className="space-y-6">
            <div className="text-center border-b pb-4">
              <h2 className="text-2xl font-bold">Devis</h2>
              <p className="text-gray-600">Réf: {quote.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Client</p>
                <p className="text-gray-600">{quote.client}</p>
              </div>
              <div>
                <p className="font-semibold">Date</p>
                <p className="text-gray-600">{quote.date}</p>
              </div>
              {quote.validUntil && (
                <div>
                  <p className="font-semibold">Valide jusqu'au</p>
                  <p className="text-gray-600">{quote.validUntil}</p>
                </div>
              )}
              <div>
                <p className="font-semibold">Montant</p>
                <p className="text-gray-600">{quote.amount}</p>
              </div>
            </div>

            {quote.description && (
              <div>
                <p className="font-semibold">Description</p>
                <p className="text-gray-600">{quote.description}</p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <p className="font-semibold mb-12">Signature du client</p>
                  <div className="border-t border-gray-300 w-48 mx-auto"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-12">Signature de l'entreprise</p>
                  <div className="border-t border-gray-300 w-48 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              #quote-preview, #quote-preview * {
                visibility: visible;
              }
              #quote-preview {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .no-print {
                display: none !important;
              }
            }
          `}
        </style>
      </DialogContent>
    </Dialog>
  );
}