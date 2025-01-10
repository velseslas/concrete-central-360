import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, ArrowLeft, Eye } from "lucide-react";
import { useState } from "react";

interface QuoteVersion {
  id: string;
  version: number;
  date: string;
  changes: string;
  amount: string;
}

interface QuoteVersionHistoryProps {
  quoteId: string;
  onViewVersion: (version: QuoteVersion) => void;
}

export function QuoteVersionHistory({ quoteId, onViewVersion }: QuoteVersionHistoryProps) {
  const [open, setOpen] = useState(false);

  // Mock data - à remplacer par des données réelles
  const versions: QuoteVersion[] = [
    {
      id: quoteId,
      version: 3,
      date: "2024-03-15",
      changes: "Mise à jour des prix",
      amount: "178,500 DA"
    },
    {
      id: quoteId,
      version: 2,
      date: "2024-03-10",
      changes: "Ajout de services supplémentaires",
      amount: "165,000 DA"
    },
    {
      id: quoteId,
      version: 1,
      date: "2024-03-05",
      changes: "Version initiale",
      amount: "150,000 DA"
    }
  ];

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
                    <div>
                      <h4 className="font-semibold">
                        Version {version.version}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {version.date}
                      </p>
                      <p className="text-sm mt-1">
                        {version.changes}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Montant: {version.amount}
                      </p>
                    </div>
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
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}