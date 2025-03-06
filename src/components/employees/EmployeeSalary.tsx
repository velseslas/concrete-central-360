
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign, Receipt, UserPlus, Clock, Percent, Trophy, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function EmployeeSalary() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddAdvanceOpen, setIsAddAdvanceOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [advanceDescription, setAdvanceDescription] = useState("");
  
  // Mock data - would be fetched from Supabase in a real implementation
  const employees = [
    { id: "1", name: "Jean Dupont", position: "Chauffeur", baseSalary: 2500, attendance: 22, overtime: 8, advances: 300 },
    { id: "2", name: "Marie Laurent", position: "Commercial", baseSalary: 2200, attendance: 21, overtime: 0, advances: 0, salesVolume: 450 },
    { id: "3", name: "Pierre Martin", position: "Opérateur Centrale", baseSalary: 2300, attendance: 20, overtime: 12, advances: 500 }
  ];

  const bonusSettings = {
    bonusPerCubicMeter: 1.5, // 1.5€ par mètre cube de béton vendu
  };

  const handleAddAdvance = async () => {
    if (!selectedEmployee || !advanceAmount) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      // Dans une vraie implémentation, cela sauvegarderait dans Supabase
      toast.success(`Acompte de ${advanceAmount}€ ajouté pour ${selectedEmployee.name}`);
      setIsAddAdvanceOpen(false);
      setAdvanceAmount("");
      setAdvanceDescription("");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'acompte");
      console.error(error);
    }
  };

  const calculateFinalSalary = (employee) => {
    const baseSalary = employee.baseSalary;
    const overtimeHours = employee.overtime || 0;
    const overtimeRate = 1.25; // 25% de plus pour les heures supplémentaires
    const hourlyRate = baseSalary / 160; // En supposant 160 heures de travail par mois
    const overtimePay = overtimeHours * hourlyRate * overtimeRate;
    
    const advances = employee.advances || 0;
    
    // Calcul de la prime pour les commerciaux
    let salesBonus = 0;
    if (employee.position === "Commercial" && employee.salesVolume) {
      salesBonus = employee.salesVolume * bonusSettings.bonusPerCubicMeter;
    }
    
    const finalSalary = baseSalary + overtimePay + salesBonus - advances;
    
    return {
      baseSalary,
      overtimePay: overtimePay.toFixed(2),
      salesBonus: salesBonus.toFixed(2),
      advances,
      finalSalary: finalSalary.toFixed(2)
    };
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-gray-700">
          <TabsTrigger value="overview">Aperçu des salaires</TabsTrigger>
          <TabsTrigger value="advances">Acomptes</TabsTrigger>
          <TabsTrigger value="bonuses">Primes de vente</TabsTrigger>
          <TabsTrigger value="reports">Fiches de paie</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Gestion des salaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader className="bg-gray-700">
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Poste</TableHead>
                    <TableHead>Salaire de base</TableHead>
                    <TableHead>Jours de présence</TableHead>
                    <TableHead>Heures supp.</TableHead>
                    <TableHead>Acomptes</TableHead>
                    <TableHead>Prime de vente</TableHead>
                    <TableHead>Salaire final</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => {
                    const salary = calculateFinalSalary(employee);
                    return (
                      <TableRow key={employee.id} className="border-gray-700">
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.baseSalary}€</TableCell>
                        <TableCell>{employee.attendance}/22</TableCell>
                        <TableCell>{employee.overtime || 0}h</TableCell>
                        <TableCell className="text-red-400">{employee.advances || 0}€</TableCell>
                        <TableCell className="text-green-400">
                          {employee.position === "Commercial" ? 
                            `${salary.salesBonus}€ (${employee.salesVolume || 0}m³)` : 
                            "N/A"}
                        </TableCell>
                        <TableCell className="font-bold">{salary.finalSalary}€</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 bg-gray-700 hover:bg-gray-600"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setIsAddAdvanceOpen(true);
                              }}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Acompte
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 bg-gray-700 hover:bg-gray-600"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Fiche
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advances" className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Receipt className="h-5 w-5 text-yellow-400" />
                Gestion des acomptes
              </CardTitle>
              <Button 
                onClick={() => setIsAddAdvanceOpen(true)}
                className="bg-[#9b87f5] hover:bg-[#8a76e5]"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Nouvel acompte
              </Button>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader className="bg-gray-700">
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell>Jean Dupont</TableCell>
                    <TableCell>12/08/2023</TableCell>
                    <TableCell>300€</TableCell>
                    <TableCell>Avance sur salaire d'août</TableCell>
                    <TableCell>
                      <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                        En attente
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-8 bg-gray-700 hover:bg-gray-600">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell>Pierre Martin</TableCell>
                    <TableCell>05/08/2023</TableCell>
                    <TableCell>500€</TableCell>
                    <TableCell>Avance exceptionnelle</TableCell>
                    <TableCell>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        Validé
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-8 bg-gray-700 hover:bg-gray-600">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonuses" className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                Primes sur ventes de béton
              </CardTitle>
              <div className="flex items-center gap-2 text-white">
                <span>Prime actuelle:</span>
                <span className="font-bold text-green-400">{bonusSettings.bonusPerCubicMeter}€ / m³</span>
                <Button variant="outline" className="h-8 bg-gray-700 hover:bg-gray-600">
                  <Percent className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader className="bg-gray-700">
                  <TableRow>
                    <TableHead>Vendeur</TableHead>
                    <TableHead>Mois</TableHead>
                    <TableHead>Volume vendu (m³)</TableHead>
                    <TableHead>Taux de prime</TableHead>
                    <TableHead>Prime totale</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell>Marie Laurent</TableCell>
                    <TableCell>Août 2023</TableCell>
                    <TableCell>450 m³</TableCell>
                    <TableCell>{bonusSettings.bonusPerCubicMeter}€ / m³</TableCell>
                    <TableCell className="font-bold text-green-400">675€</TableCell>
                    <TableCell>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        Calculé
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell>Sophie Dubois</TableCell>
                    <TableCell>Août 2023</TableCell>
                    <TableCell>320 m³</TableCell>
                    <TableCell>{bonusSettings.bonusPerCubicMeter}€ / m³</TableCell>
                    <TableCell className="font-bold text-green-400">480€</TableCell>
                    <TableCell>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        Calculé
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                Fiches de paie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Card className="w-full sm:w-64 bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                        <h3 className="font-bold text-white">Août 2023</h3>
                        <p className="text-gray-300 text-sm">Toutes les fiches de paie</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full sm:w-64 bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                        <h3 className="font-bold text-white">Juillet 2023</h3>
                        <p className="text-gray-300 text-sm">Toutes les fiches de paie</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full sm:w-64 bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                        <h3 className="font-bold text-white">Juin 2023</h3>
                        <p className="text-gray-300 text-sm">Toutes les fiches de paie</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog d'ajout d'acompte */}
      <Dialog open={isAddAdvanceOpen} onOpenChange={setIsAddAdvanceOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              Ajouter un acompte
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Employé</Label>
              <select 
                id="employee"
                className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
                value={selectedEmployee?.id || ""}
                onChange={(e) => {
                  const selected = employees.find(emp => emp.id === e.target.value);
                  setSelectedEmployee(selected || null);
                }}
              >
                <option value="">Sélectionner un employé</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (€)</Label>
              <Input 
                id="amount" 
                type="number" 
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                placeholder="Montant de l'acompte" 
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnelle)</Label>
              <Input 
                id="description" 
                value={advanceDescription}
                onChange={(e) => setAdvanceDescription(e.target.value)}
                placeholder="Raison de l'acompte" 
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsAddAdvanceOpen(false)}
              className="bg-gray-700 hover:bg-gray-600 border-gray-600"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleAddAdvance}
              className="bg-[#9b87f5] hover:bg-[#8a76e5]"
            >
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
