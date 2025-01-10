import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuoteEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: {
    id: string;
    client: string;
  } | null;
}

export function QuoteEmailDialog({ open, onOpenChange, quote }: QuoteEmailDialogProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(quote ? `Devis ${quote.id} - ${quote.client}` : "");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Envoi du devis par email:", { email, subject, message });
    
    // Simuler l'envoi
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Envoi en cours...",
        success: "Devis envoyé avec succès",
        error: "Erreur lors de l'envoi"
      }
    );

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Envoyer le devis par email
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email du destinataire
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Objet
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Objet de l'email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message..."
              rows={4}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit">
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}