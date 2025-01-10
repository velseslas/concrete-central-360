import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, ArrowLeft, Eye, RotateCcw, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QuoteEmailDialog } from "./QuoteEmailDialog";

interface QuoteVersion {
  id: string;
  version: number;
  date: string;
  changes: string;
  amount: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  comments?: string;
  modifiedBy?: string;
}

interface QuoteVersionHistoryProps {
  quoteId: string;
  onViewVersion: (version: QuoteVersion) => void;
  currentVersion: number;
}

export function QuoteVersionHistory({ quoteId, onViewVersion, currentVersion }: QuoteVersionHistoryProps) {
  const [open, setOpen] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<QuoteVersion | null>(null);

  // Mock data - à remplacer par des données réelles
  const versions: QuoteVersion[] = [
    {
      id: quoteId,
      version: 3,
      date: "2024-03-15",
      changes: "Mise à jour des prix",
      amount: "178,500 DA",
      status: "sent",
      comments: "Ajustement des tarifs suite à la réunion",
      modifiedBy: "Ahmed B."
    },
    {
      id: quoteId,
      version: 2,
      date: "2024-03-10",
      changes: "Ajout de services supplémentaires",
      amount: "165,000 DA",
      status: "draft",
      comments: "Ajout des prestations discutées",
      modifiedBy: "Sarah K."
    },
    {
      id: quoteId,
      version: 1,
      date: "2024-03-05",
      changes: "Version initiale",
      amount: "150,000 DA",
      status: "draft",
      modifiedBy: "Mohamed H."
    }
  ];

  const handleRevertToVersion = (version: QuoteVersion) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Restauration de la version en cours...",
        success: `Version ${version.version} restaurée avec succès`,
        error: "Erreur lors de la restauration"
      }
    );
  };

  const handleSendVersion = (version: QuoteVersion) => {
    setSelectedVersion(version);
    setShowEmailDialog(true);
  };

  const getStatusBadgeClass = (status: QuoteVersion["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-500/20 text-gray-400";
      case "sent":
        return "bg-blue-500/20 text-blue-400";
      case "accepted":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <History className="h-4 w-4" />
        Historique
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Historique des versions - Devis {quoteId}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {versions.map((version) => (
                <div
                  key={version.version}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">
                          Version {version.version}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(version.status)}`}>
                          {version.status === "draft" ? "Brouillon" :
                           version.status === "sent" ? "Envoyé" :
                           version.status === "accepted" ? "Accepté" : "Refusé"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {version.date} {version.modifiedBy && `par ${version.modifiedBy}`}
                      </p>
                      <p className="text-sm">
                        {version.changes}
                      </p>
                      {version.comments && (
                        <p className="text-sm text-muted-foreground italic">
                          "{version.comments}"
                        </p>
                      )}
                      <p className="text-sm font-medium">
                        Montant: {version.amount}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          onViewVersion(version);
                          setOpen(false);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        Voir
                      </Button>
                      {version.version !== currentVersion && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => handleRevertToVersion(version)}
                        >
                          <RotateCcw className="h-4 w-4" />
                          Restaurer
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleSendVersion(version)}
                      >
                        <Mail className="h-4 w-4" />
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <QuoteEmailDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        quote={selectedVersion ? {
          id: selectedVersion.id,
          client: "Client", // À remplacer par les vraies données
          version: selectedVersion.version
        } : null}
      />
    </>
  );
}