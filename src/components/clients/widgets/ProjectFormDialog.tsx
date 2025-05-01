
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export interface ProjectFormDialogProps {
  onOpenChange?: (open: boolean) => void;
  clientId?: number;
  onSuccess?: () => void;
}

export function ProjectFormDialog({ onOpenChange, clientId, onSuccess }: ProjectFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    address: "",
    concreteQuantity: "",
    status: "En cours",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.concreteQuantity) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Here we would normally submit data to the backend
    console.log("Submitting project:", formData);
    
    // Show success message
    toast.success("Chantier ajouté avec succès");
    
    // Close dialog and reset form
    if (onSuccess) onSuccess();
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <DialogContent className="max-w-2xl bg-gray-900/95 border-gray-800">
      <DialogHeader>
        <DialogTitle className="text-white text-xl">Nouveau Chantier</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-gray-300">Nom du Chantier *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Saisir le nom du chantier"
              className="mt-1 bg-gray-800/50 border-gray-700/50 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="client" className="text-gray-300">Client</Label>
            <Select
              value={formData.client}
              onValueChange={(value) => handleSelectChange("client", value)}
            >
              <SelectTrigger className="w-full mt-1 bg-gray-800/50 border-gray-700/50 text-white">
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="SARL Construction" className="text-gray-200">SARL Construction</SelectItem>
                <SelectItem value="SPA Promotech" className="text-gray-200">SPA Promotech</SelectItem>
                <SelectItem value="EURL Architectura" className="text-gray-200">EURL Architectura</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="address" className="text-gray-300">Adresse</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse du chantier"
              className="mt-1 bg-gray-800/50 border-gray-700/50 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="concreteQuantity" className="text-gray-300">Volume de Béton (m³) *</Label>
            <Input
              id="concreteQuantity"
              name="concreteQuantity"
              type="number"
              value={formData.concreteQuantity}
              onChange={handleChange}
              placeholder="Ex: 500"
              className="mt-1 bg-gray-800/50 border-gray-700/50 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="status" className="text-gray-300">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="w-full mt-1 bg-gray-800/50 border-gray-700/50 text-white">
                <SelectValue placeholder="Statut du chantier" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="En cours" className="text-gray-200">En cours</SelectItem>
                <SelectItem value="Terminé" className="text-gray-200">Terminé</SelectItem>
                <SelectItem value="En attente" className="text-gray-200">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description" className="text-gray-300">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description du chantier"
            className="mt-1 bg-gray-800/50 border-gray-700/50 text-white h-32"
          />
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange && onOpenChange(false)}
            className="bg-gray-800/50 border-gray-700/50 text-white hover:bg-gray-700/50"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
