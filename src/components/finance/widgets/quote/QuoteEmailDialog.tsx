import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, X, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuoteEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: {
    id: string;
    client: string;
    version?: number;
  } | null;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export function QuoteEmailDialog({ open, onOpenChange, quote }: QuoteEmailDialogProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(quote ? `Devis ${quote.id}${quote.version ? ` - Version ${quote.version}` : ''} - ${quote.client}` : "");
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Mock templates - à remplacer par des données réelles
  const emailTemplates: EmailTemplate[] = [
    {
      id: "template1",
      name: "Envoi initial",
      subject: "Proposition commerciale - [Référence]",
      content: `Cher client,

Nous vous prions de trouver ci-joint notre proposition commerciale [Référence].

N'hésitez pas à nous contacter pour toute question.

Cordialement,
[Nom de l'entreprise]`
    },
    {
      id: "template2",
      name: "Relance",
      subject: "Suivi de notre proposition - [Référence]",
      content: `Cher client,

Nous souhaitons nous assurer que vous avez bien reçu notre proposition [Référence].

Nous restons à votre disposition pour en discuter.

Cordialement,
[Nom de l'entreprise]`
    },
    {
      id: "template3",
      name: "Mise à jour",
      subject: "Mise à jour de notre proposition - [Référence]",
      content: `Cher client,

Suite à nos échanges, vous trouverez ci-joint la version mise à jour de notre proposition [Référence].

Nous restons à votre écoute pour toute précision.

Cordialement,
[Nom de l'entreprise]`
    }
  ];

  const handleTemplateChange = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject.replace("[Référence]", quote?.id || ""));
      setMessage(template.content.replace("[Référence]", quote?.id || ""));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Envoi du devis par email:", { email, subject, message });
    
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message);
    toast.success("Message copié dans le presse-papiers");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Envoyer le devis par email
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="template" className="text-sm font-medium">
              Modèle d'email
            </label>
            <Select
              value={selectedTemplate}
              onValueChange={handleTemplateChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un modèle" />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
            <div className="flex items-center justify-between">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopyToClipboard}
                className="h-8"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
            </div>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message..."
              rows={8}
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