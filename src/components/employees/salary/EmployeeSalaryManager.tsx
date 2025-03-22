
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog } from "@/components/ui/dialog";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Import types
import { Employee, SalaryAdvance, SalesBonus, Client, Project } from "./types";

// Import components
import { SalaryOverviewTab } from "./SalaryOverviewTab";
import { AdvancesTab } from "./AdvancesTab";
import { BonusesTab } from "./BonusesTab";
import { PaySlipsTab } from "./PaySlipsTab";
import { AdvanceDialog } from "./dialogs/AdvanceDialog";
import { SalesVolumeDialog } from "./dialogs/SalesVolumeDialog";
import { BonusRateDialog } from "./dialogs/BonusRateDialog";
import { PaySlipDialog } from "./dialogs/PaySlipDialog";

export function EmployeeSalaryManager() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");
  
  // Dialog states
  const [isAddAdvanceOpen, setIsAddAdvanceOpen] = useState(false);
  const [isAddSalesVolumeOpen, setIsAddSalesVolumeOpen] = useState(false);
  const [isBonusSettingsOpen, setIsBonusSettingsOpen] = useState(false);
  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false);
  
  // Form states
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  
  // Advance form states
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [advanceDescription, setAdvanceDescription] = useState("");
  const [advanceDate, setAdvanceDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
  // Bonus settings
  const [bonusPerCubicMeter, setBonusPerCubicMeter] = useState("1.5");
  
  // Data states
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [advances, setAdvances] = useState<SalaryAdvance[]>([]);
  const [bonuses, setBonuses] = useState<SalesBonus[]>([]);
  
  // Sales volume form states
  const [salesVolume, setSalesVolume] = useState("");
  const [salesMonth, setSalesMonth] = useState(format(new Date(), "yyyy-MM"));
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Refs
  const paySlipRef = useRef<HTMLDivElement>(null);
  
  // Filter projects based on selected client
  const filteredProjects = selectedClient 
    ? projects.filter(project => project.client_id === selectedClient) 
    : projects;
  
  // Fetch data on component mount
  useEffect(() => {
    fetchEmployees();
    fetchAdvances();
    fetchBonuses();
    fetchBonusSettings();
    fetchClients();
    fetchProjects();
  }, []);
  
  // Fetch data functions
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
  
  // Event handlers
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
  
  const handleApproveAdvance = async (advanceId: string) => {
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
  
  const handleRejectAdvance = async (advanceId: string) => {
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
  
  const handlePrintPaySlip = () => {
    if (paySlipRef.current) {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error("Impossible d'ouvrir la fenêtre d'impression");
        return;
      }
      
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
  
  const handleOpenPaySlip = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedMonth(format(new Date(), "yyyy-MM"));
    setIsPaySlipOpen(true);
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
          <SalaryOverviewTab 
            employees={employees} 
            bonusPerCubicMeter={bonusPerCubicMeter}
            onOpenPaySlip={handleOpenPaySlip}
          />
        </TabsContent>

        <TabsContent value="advances" className="mt-4">
          <AdvancesTab 
            advances={advances}
            onAddAdvance={() => setIsAddAdvanceOpen(true)}
            onApproveAdvance={handleApproveAdvance}
            onRejectAdvance={handleRejectAdvance}
          />
        </TabsContent>

        <TabsContent value="bonuses" className="mt-4">
          <BonusesTab 
            bonuses={bonuses}
            bonusPerCubicMeter={bonusPerCubicMeter}
            onAddSalesVolume={() => setIsAddSalesVolumeOpen(true)}
            onUpdateBonusRate={() => setIsBonusSettingsOpen(true)}
          />
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <PaySlipsTab 
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={isAddAdvanceOpen} onOpenChange={setIsAddAdvanceOpen}>
        <AdvanceDialog 
          employees={employees}
          selectedEmployee={selectedEmployee}
          advanceAmount={advanceAmount}
          advanceDescription={advanceDescription}
          advanceDate={advanceDate}
          onEmployeeChange={setSelectedEmployee}
          onAmountChange={setAdvanceAmount}
          onDescriptionChange={setAdvanceDescription}
          onDateChange={setAdvanceDate}
          onSubmit={handleAddAdvance}
          onCancel={() => setIsAddAdvanceOpen(false)}
        />
      </Dialog>

      <Dialog open={isAddSalesVolumeOpen} onOpenChange={setIsAddSalesVolumeOpen}>
        <SalesVolumeDialog 
          employees={employees}
          clients={clients}
          projects={projects}
          filteredProjects={filteredProjects}
          selectedEmployee={selectedEmployee}
          selectedClient={selectedClient}
          selectedProject={selectedProject}
          salesMonth={salesMonth}
          salesVolume={salesVolume}
          onEmployeeChange={setSelectedEmployee}
          onClientChange={setSelectedClient}
          onProjectChange={setSelectedProject}
          onMonthChange={setSalesMonth}
          onVolumeChange={setSalesVolume}
          onSubmit={handleAddSalesVolume}
          onCancel={() => setIsAddSalesVolumeOpen(false)}
        />
      </Dialog>

      <Dialog open={isBonusSettingsOpen} onOpenChange={setIsBonusSettingsOpen}>
        <BonusRateDialog 
          bonusPerCubicMeter={bonusPerCubicMeter}
          onBonusRateChange={setBonusPerCubicMeter}
          onSubmit={handleUpdateBonusRate}
          onCancel={() => setIsBonusSettingsOpen(false)}
        />
      </Dialog>

      <Dialog open={isPaySlipOpen} onOpenChange={setIsPaySlipOpen}>
        <PaySlipDialog 
          selectedEmployee={selectedEmployee}
          selectedMonth={selectedMonth}
          bonusPerCubicMeter={bonusPerCubicMeter}
          onPrint={handlePrintPaySlip}
          paySlipRef={paySlipRef}
        />
      </Dialog>
    </div>
  );
}
