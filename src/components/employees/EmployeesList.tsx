import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Search, Trash2, UserCircle } from "lucide-react";
import { EmployeeDetails } from "./EmployeeDetails";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeDeleteDialog } from "./EmployeeDeleteDialog";

// Temporary mock data until we connect to the backend
const mockEmployees = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    position: "Chauffeur",
    department: "Transport",
    status: "active",
    startDate: "2020-03-15",
    imageUrl: "",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Lefebvre",
    email: "marie.lefebvre@example.com",
    phone: "+33 6 23 45 67 89",
    position: "Opérateur Centrale",
    department: "Production",
    status: "active",
    startDate: "2019-08-10",
    imageUrl: "",
  },
  {
    id: "3",
    firstName: "Ahmed",
    lastName: "Bensalem",
    email: "ahmed.bensalem@example.com",
    phone: "+33 6 34 56 78 90",
    position: "Technicien",
    department: "Maintenance",
    status: "inactive",
    startDate: "2018-04-20",
    imageUrl: "",
  },
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Mercier",
    email: "sophie.mercier@example.com",
    phone: "+33 6 45 67 89 01",
    position: "Responsable",
    department: "Administration",
    status: "active",
    startDate: "2021-01-05",
    imageUrl: "",
  },
  {
    id: "5",
    firstName: "Thomas",
    lastName: "Bernard",
    email: "thomas.bernard@example.com",
    phone: "+33 6 56 78 90 12",
    position: "Commercial",
    department: "Ventes",
    status: "active",
    startDate: "2020-09-22",
    imageUrl: "",
  },
];

export function EmployeesList() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showNewEmployeeForm, setShowNewEmployeeForm] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    setShowDeleteDialog(false);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un employé..."
            className="pl-8 bg-gray-700 border-gray-600 text-white"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exporter</Button>
          <Button onClick={() => setShowNewEmployeeForm(true)}>Nouveau</Button>
          <Dialog open={showNewEmployeeForm} onOpenChange={setShowNewEmployeeForm}>
            <DialogContent className="max-w-4xl bg-gray-800 text-white border-gray-700">
              <EmployeeForm onSuccess={() => setShowNewEmployeeForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="rounded-md border border-gray-700 overflow-hidden">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-900">
            <TableRow>
              <TableHead className="text-gray-300">Employé</TableHead>
              <TableHead className="text-gray-300">Poste</TableHead>
              <TableHead className="text-gray-300">Département</TableHead>
              <TableHead className="text-gray-300">Contact</TableHead>
              <TableHead className="text-gray-300">Statut</TableHead>
              <TableHead className="text-gray-300">Date d'embauche</TableHead>
              <TableHead className="text-gray-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                  Aucun employé trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="font-medium flex items-center gap-2">
                    {employee.imageUrl ? (
                      <img 
                        src={employee.imageUrl} 
                        alt={`${employee.firstName} ${employee.lastName}`} 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-8 w-8 text-gray-400" />
                    )}
                    <div>
                      <div className="text-white">{employee.firstName} {employee.lastName}</div>
                      <div className="text-sm text-gray-400">{employee.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{employee.position}</TableCell>
                  <TableCell className="text-gray-300">{employee.department}</TableCell>
                  <TableCell className="text-gray-300">{employee.phone}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={employee.status === 'active' ? 'default' : 'destructive'}
                      className={employee.status === 'active' ? 'bg-green-600' : 'bg-red-600'}
                    >
                      {employee.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(employee.startDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={showDetails && selectedEmployee?.id === employee.id} onOpenChange={(open) => {
                        if (!open) setShowDetails(false);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setShowDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-gray-800 text-white border-gray-700">
                          <DialogHeader>
                            <DialogTitle className="text-center text-xl">Détails de l'employé</DialogTitle>
                          </DialogHeader>
                          {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={showEditForm && selectedEmployee?.id === employee.id} onOpenChange={(open) => {
                        if (!open) setShowEditForm(false);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setShowEditForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-gray-800 text-white border-gray-700">
                          <DialogHeader>
                            <DialogTitle className="text-center text-xl">Modifier l'employé</DialogTitle>
                          </DialogHeader>
                          {selectedEmployee && 
                            <EmployeeForm 
                              employee={selectedEmployee} 
                              isEditing 
                              onSuccess={() => setShowEditForm(false)}
                            />
                          }
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={showDeleteDialog && selectedEmployee?.id === employee.id} onOpenChange={(open) => {
                        if (!open) setShowDeleteDialog(false);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-900/20"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-gray-800 text-white border-gray-700">
                          <DialogHeader>
                            <DialogTitle>Supprimer l'employé</DialogTitle>
                          </DialogHeader>
                          {selectedEmployee && (
                            <EmployeeDeleteDialog 
                              employee={selectedEmployee} 
                              onConfirm={() => handleDelete(selectedEmployee.id)} 
                              onCancel={() => setShowDeleteDialog(false)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
