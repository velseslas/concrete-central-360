import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calculator, DollarSign, Receipt, UserPlus, Percent, Trophy, FileText, Printer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function EmployeeSalary() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddAdvanceOpen, setIsAddAdvanceOpen] = useState(false);
  const [isAddSalesVolumeOpen, setIsAddSalesVolumeOpen] = useState(false);
  const [isBonusSettingsOpen, setIsBonusSettingsOpen] = useState(false);
  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [advanceDescription, setAdvanceDescription] = useState("");
  const [advanceDate, setAdvanceDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [bonusPerCubicMeter, setBonusPerCubicMeter] = useState("1.5");
  const [employees, setEmployees] = useState<any[]>([]);
  const [advances, setAdvances] = useState<any[]>([]);
  const [bonuses, setBonuses] = useState<any[]>([]);
  const [salesVolume, setSalesVolume] = useState("");
  const [salesMonth, setSalesMonth] = useState(format(new Date(), "yyyy-MM"));
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const paySlipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fetchEmployees();
    fetchAdvances();
    fetchBonuses();
    fetchBonusSettings();
    fetchClients();
    fetchProjects();
  }, []);

  const fetchClients = async () => {
    // Mock clients data - in a real app, this would come from Supabase
    setClients([
      { id: "1", name: "Client A" },
      { id: "2", name: "Client B" },
      { id: "3", name: "Client C" },
    ]);
  };

  const fetchProjects = async () => {
    // Mock projects data - in a real app, this would come from Supabase
    setProjects([
      { id: "1", name: "Projet 1", client_id: "1" },
      { id: "2", name: "Projet 2", client_id: "1" },
      { id: "3", name: "Projet 3", client_id: "2" },
      { id: "4", name: "Projet 4", client_id: "3" },
    ]);
  };

  // Filter projects based on selected client
  const filteredProjects = selectedClient 
    ? projects.filter(project => project.client_id === selectedClient) 
    : projects;

  const fetchEmployees = async () => {
    try {
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
      const { data, error } = await supabase
        .from('salary_advances')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      setAdvances(data || []);
    } catch (error) {
      console.error("Error fetching advances:", error);
      setAdvances([
        { id: '1', employee_id: '1', employee_name: 'Jean Dupont', date: '2023-08-12', amount: 300, description: "Avance sur salaire d'août", status: 'pending' },
        { id: '2', employee_id: '3', employee_name: 'Pierre Martin', date: '2023-08-05', amount: 500, description: 'Avance exceptionnelle', status: 'approved' }
      ]);
    }
  };

  const fetchBonuses = async () => {
    try {
      const { data, error } = await supabase
        .from('sales_bonuses')
        .select('*')
        .order('month', { ascending: false });
      
      if (error) throw error;
      setBonuses(data || []);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      setBonuses([
        { id: '1', employee_id: '2', employee_name: 'Marie Laurent', month: '2023-08-01', volume_sold: 450, bonus_per_cubic_meter: 1.5, total_bonus: 675, status: 'calculated', client_name: 'Client A', project_name: 'Projet 1' },
        { id: '2', employee_id: '4', employee_name: 'Sophie Dubois', month: '2023-08-01', volume_sold: 320, bonus_per_cubic_meter: 1.5, total_bonus: 480, status: 'calculated', client_name: 'Client B', project_name: 'Projet 3' }
      ]);
    }
  };

  const fetchBonusSettings = async () => {
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
        employee_name: selectedEmployee.name,
        amount: parseFloat(advanceAmount),
        date: advanceDate,
        description: advanceDescription || undefined,
        status: 'pending'
      };

      const { error } = await supabase
        .from('salary_advances')
        .insert(newAdvance);

      if (error) throw error;

      toast.success(`Acompte de ${advanceAmount} DA ajouté pour ${selectedEmployee.name}`);
      setIsAddAdvanceOpen(false);
      setAdvanceAmount("");
      setAdvanceDescription("");
      setAdvanceDate(format(new Date(), "yyyy-MM-dd"));
      
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
      toast.success(`Taux de prime mis à jour à ${bonusPerCubicMeter} DA par m³`);
      setIsBonusSettingsOpen(false);
      
      fetchBonuses();
    } catch (error) {
      console.error("Error updating bonus rate:", error);
      toast.error("Erreur lors de la mise à jour du taux de prime");
    }
  };

  const handleAddSalesVolume = async () => {
    if (!selectedEmployee || !salesVolume || !salesMonth || !selectedClient || !selectedProject) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const volume = parseFloat(salesVolume);
      const bonus = volume * parseFloat(bonusPerCubicMeter);
      
      // Find the client and project names for the record
      const client = clients.find(c => c.id === selectedClient);
      const project = projects.find(p => p.id === selectedProject);
      
      const newBonus = {
        employee_id: selectedEmployee.id,
        employee_name: selectedEmployee.name,
        month: `${salesMonth}-01`,
        volume_sold: volume,
        bonus_per_cubic_meter: parseFloat(bonusPerCubicMeter),
        total_bonus: bonus,
        status: 'calculated',
        client_id: selectedClient,
        client_name: client?.name || "",
        project_id: selectedProject,
        project_name: project?.name || ""
      };

      const { error } = await supabase
        .from('sales_bonuses')
        .insert(newBonus);

      if (error) throw error;

      toast.success(`Volume de vente de ${salesVolume}m³ enregistré pour ${selectedEmployee.name}`);
      setIsAddSalesVolumeOpen(false);
      setSalesVolume("");
      setSelectedClient("");
      setSelectedProject("");
      setSelectedEmployee(null);
      
      fetchBonuses();
    } catch (error) {
      console.error("Error adding sales volume:", error);
      toast.error("Erreur lors de l'enregistrement du volume de vente");
    }
  };

  const handleApproveAdvance = async (advanceId) => {
    try {
      const { error } = await supabase
        .from('salary_advances')
        .update({ status: 'approved' })
        .eq('id', advanceId);

      if (error) throw error;

      toast.success("Acompte approuvé avec succès");
      fetchAdvances();
    } catch (error) {
      console.error("Error approving advance:", error);
      toast.error("Erreur lors de l'approbation de l'acompte");
    }
  };

  const handleRejectAdvance = async (advanceId) => {
    try {
      const { error } = await supabase
        .from('salary_advances')
        .update({ status: 'rejected' })
        .eq('id', advanceId);

      if (error) throw error;

      toast.success("Acompte rejeté");
      fetchAdvances();
    } catch (error) {
      console.error("Error rejecting advance:", error);
      toast.error("Erreur lors du rejet de l'acompte");
    }
  };

  const calculateFinalSalary = (employee) => {
    const baseSalary = employee.baseSalary;
    const overtimeHours = employee.overtime || 0;
    const overtimeRate = 1.25;
    const hourlyRate = baseSalary / 160;
    const overtimePay = overtimeHours * hourlyRate * overtimeRate;
    
    const advances = employee.advances || 0;
    
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

  const handlePrintPaySlip = () => {
    if (paySlipRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><title>Fiche de paie</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; margin: 0; }
        .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .company-info, .employee-info { margin-bottom: 15px; }
        h1, h2, h3 { color: #444; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 6px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f5f5f5; }
        .total { font-weight: bold; margin-top: 15px; text-align: right; font-size: 1.1em; }
        @page { size: auto; margin: 10mm; }
        @media print {
          body { max-width: 100%; }
        }
      `);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write(paySlipRef.current.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
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
                        <TableCell>{employee.baseSalary} DA</TableCell>
                        <TableCell>{employee.attendance}/22</TableCell>
                        <TableCell>{employee.overtime || 0}h</TableCell>
                        <TableCell className="text-red-400">{employee.advances || 0} DA</TableCell>
                        <TableCell className="text-green-400">
                          {employee.position === "Commercial" ? 
                            `${salary.salesBonus} DA (${employee.salesVolume || 0}m³)` : 
                            "N/A"}
                        </TableCell>
                        <TableCell className="font-bold">{salary.finalSalary} DA</TableCell>
                        <TableCell>
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
                        <TableCell>{advance.amount} DA</TableCell>
                        <TableCell>{advance.description || '-'}</TableCell>
                        <TableCell>
                          <span className={`${
                            advance.status === 'approved' 
                              ? 'bg-green-500/20 text-green-400' 
                              : advance.status === 'rejected'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-orange-500/20 text-orange-400'
                          } px-2 py-1 rounded-full text-xs`}>
                            {advance.status === 'approved' 
                              ? 'Validé' 
                              : advance.status === 'rejected'
                                ? 'Rejeté'
                                : 'En attente'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {advance.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 bg-green-700/30 hover:bg-green-600/50 text-green-400"
                                onClick={() => handleApproveAdvance(advance.id)}
                              >
                                <Calculator className="h-4 w-4 mr-1" />
                                Valider
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 bg-red-700/30 hover:bg-red-600/50 text-red-400"
                                onClick={() => handleRejectAdvance(advance.id)}
                              >
                                <DollarSign className="h-4 w-4 mr-1" />
                                Refuser
                              </Button>
                            </div>
                          )}
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
                <span className="font-bold text-green-400">{bonusPerCubicMeter} DA / m³</span>
                <Button 
                  variant="outline" 
                  className="h-8 bg-gray-700 hover:bg-gray-600"
                  onClick={() => setIsBonusSettingsOpen(true)}
                >
                  <Percent className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <Button 
                  className="h-8 bg-[#9b87f5] hover:bg-[#8a76e5]"
                  onClick={() => setIsAddSalesVolumeOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Ajouter volume
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader className="bg-gray-700">
                  <TableRow>
                    <TableHead>Vendeur</TableHead>
                    <TableHead>Mois</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Chantier</TableHead>
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
                        <TableCell>{bonus.client_name || '-'}</TableCell>
                        <TableCell>{bonus.project_name || '-'}</TableCell>
                        <TableCell>{bonus.volume_sold} m³</TableCell>
                        <TableCell>{bonus.bonus_per_cubic_meter} DA / m³</TableCell>
                        <TableCell className="font-bold text-green-400">{bonus.total_bonus} DA</TableCell>
                        <TableCell>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                            {bonus.status === 'calculated' ? 'Calculé' : bonus.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
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
              <Label htmlFor="amount">Montant (DA)</Label>
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

      <Dialog open={isAddSalesVolumeOpen} onOpenChange={setIsAddSalesVolumeOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              Enregistrer un volume de vente
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sales-employee">Vendeur</Label>
              <select 
                id="sales-employee"
                className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
                value={selectedEmployee?.id || ""}
                onChange={(e) => {
                  const selected = employees.find(emp => emp.id === e.target.value);
                  setSelectedEmployee(selected || null);
                }}
              >
                <option value="">Sélectionner un vendeur</option>
                {employees
                  .filter(emp => emp.position === "Commercial")
                  .map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <select 
                id="client"
                className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
                value={selectedClient}
                onChange={(e) => {
                  setSelectedClient(e.target.value);
                  setSelectedProject(""); // Reset project when client changes
                }}
              >
                <option value="">Sélectionner un client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Chantier</Label>
              <select 
                id="project"
                className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                disabled={!selectedClient}
              >
                <option value="">Sélectionner un chantier</option>
                {filteredProjects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales-month">Mois</Label>
              <Input 
                id="sales-month" 
                type="month" 
                value={salesMonth}
                onChange={(e) => setSalesMonth(
