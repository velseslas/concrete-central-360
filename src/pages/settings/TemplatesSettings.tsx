
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, Save, Eye, Download, Upload, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Template {
  id: string;
  name: string;
  type: string;
  isDefault: boolean;
  lastModified: string;
}

export default function TemplatesSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("invoices");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editTemplate, setEditTemplate] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  
  const templates: Template[] = [
    { id: "1", name: "Facture Standard", type: "invoice", isDefault: true, lastModified: "2023-12-15" },
    { id: "2", name: "Facture Détaillée", type: "invoice", isDefault: false, lastModified: "2023-11-10" },
    { id: "3", name: "Devis Simple", type: "quote", isDefault: true, lastModified: "2023-12-20" },
    { id: "4", name: "Devis Complet", type: "quote", isDefault: false, lastModified: "2023-10-05" },
    { id: "5", name: "Rapport Mensuel", type: "report", isDefault: true, lastModified: "2023-12-10" },
    { id: "6", name: "Rapport Trimestriel", type: "report", isDefault: false, lastModified: "2023-11-22" },
  ];

  const handleOpenPreview = (template: Template) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
    setEditTemplate(false);
    setTemplateName(template.name);
    setTemplateContent("Contenu du modèle " + template.name + "...\n\nCeci est un exemple de contenu pour le modèle.\nVous pouvez personnaliser ce contenu selon vos besoins.");
  };

  const handleEditTemplate = () => {
    setEditTemplate(true);
  };

  const handleSaveTemplate = () => {
    toast.success("Modèle enregistré avec succès");
    setEditTemplate(false);
  };

  const handleDownloadTemplate = () => {
    toast.success("Téléchargement du modèle...");
  };

  const handleSaveTemplates = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Modèles mis à jour avec succès");
    }, 1500);
  };

  const filteredTemplates = templates.filter(template => template.type === activeTab);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => navigate('/settings')}
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux paramètres
        </Button>
        
        <div className="relative mb-10 bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-100">
              <FileText className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Modèles de documents</h1>
              <p className="text-gray-400 mt-1">Personnaliser les factures et devis</p>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="bg-gray-800 border-gray-700 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-white">Modèles de documents</CardTitle>
          <CardDescription className="text-gray-400">
            Personnalisez les modèles pour différents types de documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="invoices" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-900 border border-gray-700">
              <TabsTrigger 
                value="invoice" 
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
              >
                Factures
              </TabsTrigger>
              <TabsTrigger 
                value="quote" 
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
              >
                Devis
              </TabsTrigger>
              <TabsTrigger 
                value="report" 
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
              >
                Rapports
              </TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg flex items-center justify-between">
                        <span>{template.name}</span>
                        {template.isDefault && (
                          <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">Par défaut</span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Dernière modification: {template.lastModified}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:text-white"
                          onClick={() => handleOpenPreview(template)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:text-white"
                          onClick={handleDownloadTemplate}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="bg-gray-900 border-gray-700 border-dashed hover:border-yellow-500 transition-all cursor-pointer flex items-center justify-center h-[172px]">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Plus className="h-8 w-8 text-yellow-500 mb-2" />
                    <p className="text-yellow-500 text-center">Ajouter un nouveau modèle</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
          
          <div className="pt-6 flex justify-end">
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button 
                onClick={handleSaveTemplates}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Enregistrer les modifications</span>
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl text-white flex items-center justify-between">
              {editTemplate ? "Modifier le modèle" : "Aperçu du modèle"}
              <div className="flex items-center space-x-2">
                {!editTemplate ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-600 text-yellow-500 hover:text-yellow-400"
                    onClick={handleEditTemplate}
                  >
                    Modifier
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-500 hover:text-green-400"
                    onClick={handleSaveTemplate}
                  >
                    Enregistrer
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-500 hover:text-blue-400"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {editTemplate ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="template-name" className="text-white">Nom du modèle</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="template-content" className="text-white">Contenu du modèle</Label>
                <Textarea
                  id="template-content"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white min-h-[300px]"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-md min-h-[400px] text-black overflow-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Nom de l'entreprise</h2>
                <p>Adresse de l'entreprise</p>
                <p>Téléphone et email</p>
              </div>
              
              <h1 className="text-2xl font-bold mb-4 text-center">
                {selectedTemplate?.type === 'invoice' ? 'FACTURE' : 
                 selectedTemplate?.type === 'quote' ? 'DEVIS' : 'RAPPORT'}
              </h1>
              
              <div className="flex justify-between mb-6">
                <div>
                  <p className="font-bold">Client:</p>
                  <p>Nom du client</p>
                  <p>Adresse du client</p>
                </div>
                <div>
                  <p><span className="font-bold">N°:</span> 2023-001</p>
                  <p><span className="font-bold">Date:</span> 01/01/2023</p>
                  {selectedTemplate?.type === 'invoice' && (
                    <p><span className="font-bold">Échéance:</span> 31/01/2023</p>
                  )}
                </div>
              </div>
              
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-left">Description</th>
                    <th className="border border-gray-300 p-2 text-right">Quantité</th>
                    <th className="border border-gray-300 p-2 text-right">Prix unitaire</th>
                    <th className="border border-gray-300 p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Produit ou service 1</td>
                    <td className="border border-gray-300 p-2 text-right">2</td>
                    <td className="border border-gray-300 p-2 text-right">500,00 DA</td>
                    <td className="border border-gray-300 p-2 text-right">1 000,00 DA</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Produit ou service 2</td>
                    <td className="border border-gray-300 p-2 text-right">1</td>
                    <td className="border border-gray-300 p-2 text-right">750,00 DA</td>
                    <td className="border border-gray-300 p-2 text-right">750,00 DA</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2 font-bold text-right">Sous-total</td>
                    <td className="border border-gray-300 p-2 text-right">1 750,00 DA</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2 font-bold text-right">TVA (19%)</td>
                    <td className="border border-gray-300 p-2 text-right">332,50 DA</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2 font-bold text-right">Total</td>
                    <td className="border border-gray-300 p-2 text-right font-bold">2 082,50 DA</td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="mt-8">
                <p className="font-bold">Conditions de paiement:</p>
                <p>Paiement à 30 jours à compter de la date de facturation.</p>
              </div>
              
              <div className="mt-8 text-center text-sm">
                <p>Nom de l'entreprise - RC: 12345678 - NIF: 987654321 - NIS: 123456789</p>
                <p>Coordonnées bancaires: RIB 123456789012345678901</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
