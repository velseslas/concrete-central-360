
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: { id: string, nom: string }[];
}

export function DocumentUploadDialog({ open, onOpenChange, clients }: DocumentUploadDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [clientId, setClientId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !documentType || !clientId || !file) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    try {
      setUploading(true);
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      toast.success("Document téléchargé avec succès");
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast.error("Erreur lors du téléchargement du document");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDocumentType("");
    setClientId("");
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Ajouter un document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Titre du document *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez un titre"
              className="bg-gray-800/50 border-gray-700/50 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez une description"
              className="bg-gray-800/50 border-gray-700/50 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="documentType" className="text-gray-300">Type de document *</Label>
            <Select value={documentType} onValueChange={setDocumentType} required>
              <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Contrat" className="text-gray-200">Contrat</SelectItem>
                <SelectItem value="Facture" className="text-gray-200">Facture</SelectItem>
                <SelectItem value="Bon de commande" className="text-gray-200">Bon de commande</SelectItem>
                <SelectItem value="Autre" className="text-gray-200">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client" className="text-gray-300">Client *</Label>
            <Select value={clientId} onValueChange={setClientId} required>
              <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                <SelectValue placeholder="Sélectionnez un client" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id} className="text-gray-200">
                    {client.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file" className="text-gray-300">Fichier *</Label>
            <div className="border border-dashed border-gray-700/50 p-6 rounded-md flex items-center justify-center">
              <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-400">
                    {file ? file.name : "Cliquez ou déposez un fichier"}
                  </span>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  required
                />
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700"
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={uploading}
            >
              {uploading ? "Téléchargement..." : "Télécharger"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
