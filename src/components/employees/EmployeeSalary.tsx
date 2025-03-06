
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign, Receipt, UserPlus, Clock, Percent, Trophy, FileText, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function EmployeeSalary() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddAdvanceOpen, setIsAddAdvanceOpen] = useState(false);
  const [isBonusSettingsOpen, setIsBonusSettingsOpen] = useState(false);
  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [advanceDescription, setAdvanceDescription] = useState("");
  const [advanceDate, setAdvanceDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [bonusPerCubicMeter, setBonusPerCubicMeter] = useState("1.5");
  const [employees, setEmployees] = useState([]);
  const [advances, setAdvances] = useState([]);
  const [bonuses, setBonuses] = useState([]);
  
  // Fetch data on load
  useEffect(() => {
    fetchEmployees();
    fetchAdvances();
    fetchBonuses();
    fetchBonusSettings();
  }, []);

  const fetchEmployees = async () => {
    try {
      // In a real implementation, this would fetch from the database
      // For now, use mock data
      setEmployees([
        { id: "1", name: "Jean Dupont", position: "Chauffeur", baseSalary: 2500, attendance: 22, overtime: 8, advances: 300 },
        { id: "2", name: "Marie Laurent", position: "Commercial", baseSalary: 2200, attendance: 21, overtime: 0, advances: 0, salesVolume: 450 },
        { id: "3", name: "Pierre Martin", position: "Opérateur Centrale", baseSalary: 2300, attendance: 20, overtime: 12, advances: 500 }
      ]);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Erreur lors du chargement des employés");
    }
  };

  const fetchAdvances = async () => {
    try {
      // In a real implementation, this would fetch from the database
      const { data, error } = await supabase
        .from('salary_advances')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      setAdvances(data || []);
    } catch (error) {
      console.error("Error fetching advances:", error);
      // Use mock data if database is not yet set up
      setAdvances([
        { id: '1', employee_id: '1', employee_name: 'Jean Dupont', date: '2023-08-12', amount: 300, description: "Avance sur salaire d'août", status: 'pending' },
        { id: '2', employee_id: '3', employee_name: 'Pierre Martin', date: '2023-08-05', amount: 500, description: 'Avance exceptionnelle', status: 'approved' }
      ]);
    }
  };

  const fetchBonuses = async () => {
    try {
      // In a real implementation, this would fetch from the database
      const { data, error } = await supabase
        .from('sales_bonuses')
        .select('*')
        .order('month', { ascending: false });
      
      if (error) throw error;
      setBonuses(data || []);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      // Use mock data if database is not yet set up
      setBonuses([
        { id: '1', employee_id: '2', employee_name: 'Marie Laurent', month: '2023-08-01', volume_sold: 450, bonus_per_cubic_meter: 1.5, total_bonus: 675, status: 'calculated' },
        { id: '2', employee_id: '4', employee_name: 'Sophie Dubois', month: '2023-08-01', volume_sold: 320, bonus_per_cubic_meter: 1.5, total_bonus: 480, status: 'calculated' }
      ]);
    }
  };

  const fetchBonusSettings = async () => {
    // This would fetch the current bonus rate from settings table
    // For now, use the default value
    setBonusPerCubicMeter("1.5");
  };

  const handleAddAdvance = async () => {
    if (!selectedEmployee || !advanceAmount || !advanceDate) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const newAdvance = {
        employee_id: selectedEmployee.id,
        amount: parseFloat(advanceAmount),
        date: advanceDate,
        description: advanceDescription || undefined,
        status: 'pending'
      };

      const { error } = await supabase
        .from('salary_advances')
        .insert(newAdvance);

      if (error) throw error;

      toast.success(`Acompte de ${advanceAmount}€ ajouté pour ${selectedEmployee.name}`);
      setIsAddAdvanceOpen(false);
      setAdvanceAmount("");
      setAdvanceDescription("");
      setAdvanceDate(format(new Date(), "yyyy-MM-dd"));
      
      // Refresh advances list
      fetchAdvances();
    } catch (error) {
      console.error("Error adding advance:", error);
      toast.error("Erreur lors de l'ajout de l'acompte");
    }
  };

  const handleUpdateBonusRate = async () => {
    if (!bonusPerCubicMeter || parseFloat(bonusPerCubicMeter) <= 0) {
      toast.error("Veuillez entrer un taux de prime valide");
      return;
    }

    try {
      // In a real implementation, this would update the settings in the database
      toast.success(`Taux de prime mis à jour à ${bonusPerCubicMeter}€ par m³`);
      setIsBonusSettingsOpen(false);
      
      // Refresh bonuses with the new rate
      fetchBonuses();
    } catch (error) {
      console.error("Error updating bonus rate:", error);
      toast.error("Erreur lors de la mise à jour du taux de prime");
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
      salesBonus = employee.salesVolume * parseFloat(bonusPerCubicMeter);
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

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
    } catch (e) {
      return dateString;
    }
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
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setSelectedMonth(format(new Date(), "yyyy-MM"));
                                setIsPaySlipOpen(true);
                              }}
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
                  {advances.length > 0 ? (
                    advances.map((advance) => (
                      <TableRow key={advance.id} className="border-gray-700">
                        <TableCell>{advance.employee_name || 'Employé'}</TableCell>
                        <TableCell>{formatDate(advance.date)}</TableCell>
                        <TableCell>{advance.amount}€</TableCell>
                        <TableCell>{advance.description || '-'}</TableCell>
                        <TableCell>
                          <span className={`${
                            advance.status === 'approved' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-orange-500/20 text-orange-400'
                          } px-2 py-1 rounded-full text-xs`}>
                            {advance.status === 'approved' ? 'Validé' : 'En attente'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="h-8 bg-gray-700 hover:bg-gray-600">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Aucun acompte trouvé
                      </TableCell>
                    </TableRow>
                  )}
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
                <span className="font-bold text-green-400">{bonusPerCubicMeter}€ / m³</span>
                <Button 
                  variant="outline" 
                  className="h-8 bg-gray-700 hover:bg-gray-600"
                  onClick={() => setIsBonusSettingsOpen(true)}
                >
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
                  {bonuses.length > 0 ? (
                    bonuses.map((bonus) => (
                      <TableRow key={bonus.id} className="border-gray-700">
                        <TableCell>{bonus.employee_name || 'Vendeur'}</TableCell>
                        <TableCell>{formatDate(bonus.month)}</TableCell>
                        <TableCell>{bonus.volume_sold} m³</TableCell>
                        <TableCell>{bonus.bonus_per_cubic_meter}€ / m³</TableCell>
                        <TableCell className="font-bold text-green-400">{bonus.total_bonus}€</TableCell>
                        <TableCell>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                            {bonus.status === 'calculated' ? 'Calculé' : bonus.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Aucune prime trouvée
                      </TableCell>
                    </TableRow>
                  )}
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
                <div className="flex items-center gap-4 mb-6">
                  <Label htmlFor="month-select" className="whitespace-nowrap">Sélectionner un mois:</Label>
                  <Input
                    id="month-select"
                    type="month"
                    className="w-48 bg-gray-700 border-gray-600"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  />
                  <Button 
                    className="bg-[#9b87f5] hover:bg-[#8a76e5]"
                    disabled={!selectedMonth}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Générer toutes les fiches
                  </Button>
                </div>
                
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
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={advanceDate}
                onChange={(e) => setAdvanceDate(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
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

      {/* Dialog de configuration des primes */}
      <Dialog open={isBonusSettingsOpen} onOpenChange={setIsBonusSettingsOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              Configurer les primes de vente
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bonus-rate">Prime par mètre cube (€)</Label>
              <Input 
                id="bonus-rate" 
                type="number" 
                step="0.1"
                value={bonusPerCubicMeter}
                onChange={(e) => setBonusPerCubicMeter(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
              <p className="text-sm text-gray-400">
                Ce montant sera multiplié par le volume de béton vendu pour calculer la prime.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsBonusSettingsOpen(false)}
              className="bg-gray-700 hover:bg-gray-600 border-gray-600"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleUpdateBonusRate}
              className="bg-[#9b87f5] hover:bg-[#8a76e5]"
            >
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de fiche de paie */}
      <Dialog open={isPaySlipOpen} onOpenChange={setIsPaySlipOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Fiche de paie
            </DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="py-4">
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold">SARL BÉTON</h2>
                    <p className="text-gray-400">123 Rue du Béton</p>
                    <p className="text-gray-400">75000 Paris</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-semibold">Fiche de paie</h3>
                    <p className="text-gray-400">
                      {selectedMonth ? 
                        format(new Date(selectedMonth + "-01"), 'MMMM yyyy', { locale: fr }) : 
                        "Août 2023"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-b border-gray-600 py-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Informations employé</h4>
                      <p><span className="text-gray-400">Nom:</span> {selectedEmployee.name}</p>
                      <p><span className="text-gray-400">Poste:</span> {selectedEmployee.position}</p>
                      <p><span className="text-gray-400">Matricule:</span> EMP-{selectedEmployee.id}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Période</h4>
                      <p><span className="text-gray-400">Du:</span> 01/08/2023</p>
                      <p><span className="text-gray-400">Au:</span> 31/08/2023</p>
                      <p><span className="text-gray-400">Jours travaillés:</span> {selectedEmployee.attendance}/22</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Rémunération</h4>
                  <Table className="text-white">
                    <TableHeader className="bg-gray-600">
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-600">
                        <TableCell>Salaire de base</TableCell>
                        <TableCell className="text-right">{selectedEmployee.baseSalary.toFixed(2)}€</TableCell>
                      </TableRow>
                      {selectedEmployee.overtime > 0 && (
                        <TableRow className="border-gray-600">
                          <TableCell>Heures supplémentaires ({selectedEmployee.overtime}h)</TableCell>
                          <TableCell className="text-right">{calculateFinalSalary(selectedEmployee).overtimePay}€</TableCell>
                        </TableRow>
                      )}
                      {selectedEmployee.position === "Commercial" && selectedEmployee.salesVolume && (
                        <TableRow className="border-gray-600">
                          <TableCell>Prime de vente ({selectedEmployee.salesVolume} m³)</TableCell>
                          <TableCell className="text-right">{calculateFinalSalary(selectedEmployee).salesBonus}€</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Déductions</h4>
                  <Table className="text-white">
                    <TableHeader className="bg-gray-600">
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-600">
                        <TableCell>Sécurité sociale (20%)</TableCell>
                        <TableCell className="text-right">-{(selectedEmployee.baseSalary * 0.2).toFixed(2)}€</TableCell>
                      </TableRow>
                      {selectedEmployee.advances > 0 && (
                        <TableRow className="border-gray-600">
                          <TableCell>Acomptes</TableCell>
                          <TableCell className="text-right">-{selectedEmployee.advances.toFixed(2)}€</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Salaire net à payer</span>
                    <span>{calculateFinalSalary(selectedEmployee).finalSalary}€</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <Button 
                  variant="outline" 
                  className="bg-gray-700 hover:bg-gray-600"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a76e5]"
                  onClick={() => setIsPaySlipOpen(false)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
