import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Printer } from "lucide-react";
import { Quote } from "../types";

interface QuoteDetailsProps {
  quote: Quote | null;
  onExport: () => void;
  onPreview: () => void;
  onPrint: () => void;
}

export function QuoteDetails({ quote, onExport, onPreview, onPrint }: QuoteDetailsProps) {
  if (!quote) return null;

  return (
    <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          Détails du Devis {quote.id}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Client</p>
            <p className="text-white font-medium">{quote.client}</p>
          </div>
          <div>
            <p className="text-gray-400">Montant</p>
            <p className="text-white font-medium">{quote.amount}</p>
          </div>
          <div>
            <p className="text-gray-400">Date</p>
            <p className="text-white font-medium">{quote.date}</p>
          </div>
          <div>
            <p className="text-gray-400">Statut</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              quote.status === "accepted" ? "bg-green-500/20 text-green-400" :
              quote.status === "rejected" ? "bg-red-500/20 text-red-400" :
              "bg-yellow-500/20 text-yellow-400"
            }`}>
              {quote.status === "accepted" ? "Accepté" : 
               quote.status === "rejected" ? "Refusé" : 
               "En attente"}
            </span>
          </div>
          {quote.description && (
            <div className="col-span-2">
              <p className="text-gray-400">Description</p>
              <p className="text-white font-medium">{quote.description}</p>
            </div>
          )}
          {quote.validUntil && (
            <div className="col-span-2">
              <p className="text-gray-400">Valide jusqu'au</p>
              <p className="text-white font-medium">{quote.validUntil}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onExport}
            className="bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 text-primary-foreground transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            variant="outline"
            onClick={onPreview}
            className="bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 text-primary-foreground transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
          <Button
            variant="default"
            onClick={onPrint}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}