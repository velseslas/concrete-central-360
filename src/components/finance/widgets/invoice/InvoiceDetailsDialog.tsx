import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { InvoiceActions } from "./components/InvoiceActions";
import { InvoiceDetails } from "./components/InvoiceDetails";
import { InvoicePrintPreview } from "./components/InvoicePrintPreview";

interface InvoiceDetailsDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (status: Invoice["status"]) => void;
}

export function InvoiceDetailsDialog({ 
  invoice, 
  open, 
  onOpenChange, 
  onStatusChange 
}: InvoiceDetailsDialogProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handlePrintInvoice = async () => {
    const invoiceElement = document.getElementById('invoice-preview');
    if (!invoiceElement) {
      toast.error("Erreur lors de l'impression");
      return;
    }
    
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Impression Facture</title>
            <style>
              @page {
                size: A4;
                margin: 20mm;
              }
              @media print {
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.5;
                  color: #000;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                th, td {
                  padding: 8px;
                  border: 1px solid #ddd;
                  text-align: left;
                }
                th {
                  background-color: #f8f9fa;
                }
                .header {
                  margin-bottom: 30px;
                }
                .footer {
                  margin-top: 50px;
                }
                .company-info {
                  margin-bottom: 20px;
                }
                .invoice-details {
                  margin-bottom: 30px;
                }
                .total-section {
                  margin-top: 20px;
                }
                .no-print {
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>
            ${invoiceElement.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
    toast.success("Impression de la facture " + invoice?.id);
  };

  const handleDownloadInvoice = async () => {
    const invoiceElement = document.getElementById('invoice-preview');
    if (!invoiceElement) {
      toast.error("Erreur lors du téléchargement");
      return;
    }

    try {
      const canvas = await html2canvas(invoiceElement);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`facture-${invoice?.id}.pdf`);
      
      toast.success("Téléchargement de la facture " + invoice?.id);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      toast.error("Erreur lors du téléchargement du PDF");
    }
  };

  const handleValidateInvoice = () => {
    if (invoice) {
      onStatusChange("paid");
      toast.success(`La facture ${invoice.id} a été validée avec succès`);
    }
  };

  const isValidateEnabled = invoice?.status === "paid";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              Détails de la Facture {invoice?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <InvoiceDetails 
              invoice={invoice} 
              onStatusChange={onStatusChange} 
            />
            <InvoiceActions 
              invoice={invoice}
              isValidateEnabled={isValidateEnabled}
              onValidate={handleValidateInvoice}
              onPreviewClick={() => setShowPreview(true)}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="bg-white text-gray-900 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold border-b pb-4 no-print">
              Facture #{invoice?.id}
            </DialogTitle>
          </DialogHeader>
          
          <InvoicePrintPreview 
            invoice={invoice}
            onPrint={handlePrintInvoice}
            onDownload={handleDownloadInvoice}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}