
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, Save, User, Users, Shield, Check, Plus, Trash2, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";

interface User {
  id: string;
  email: string;
  role: string;
  active: boolean;
  lastLogin: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface AuthLog {
  id: string;
  userId: string;
  userEmail: string;
  action: "login" | "logout";
  timestamp: string;
  ipAddress: string;
  deviceInfo: string;
}

interface UserAction {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: string;
  module: string;
}

export default function AuthSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  
  const [users, setUsers] = useState<User[]>([
    { id: "1", email: "admin@example.com", role: "admin", active: true, lastLogin: "2023-09-10" },
    { id: "2", email: "manager@example.com", role: "manager", active: true, lastLogin: "2023-09-15" },
    { id: "3", email: "user@example.com", role: "user", active: true, lastLogin: "2023-09-18" },
    { id: "4", email: "inactive@example.com", role: "user", active: false, lastLogin: "2023-08-20" },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { 
      id: "1", 
      name: "admin", 
      description: "Administrateur système avec accès complet", 
      permissions: ["all"]
    },
    { 
      id: "2", 
      name: "manager", 
      description: "Gestionnaire avec accès à la plupart des fonctionnalités", 
      permissions: ["read:all", "write:most", "delete:some"]
    },
    { 
      id: "3", 
      name: "user", 
      description: "Utilisateur standard avec accès limité", 
      permissions: ["read:most", "write:some"]
    },
  ]);

  const [authLogs, setAuthLogs] = useState<AuthLog[]>([
    {
      id: "1",
      userId: "1",
      userEmail: "admin@example.com",
      action: "login",
      timestamp: "2023-09-10 08:30:15",
      ipAddress: "192.168.1.1",
      deviceInfo: "Chrome 98.0.4758.102 - Windows 10"
    },
    {
      id: "2",
      userId: "1",
      userEmail: "admin@example.com",
      action: "logout",
      timestamp: "2023-09-10 12:45:22",
      ipAddress: "192.168.1.1",
      deviceInfo: "Chrome 98.0.4758.102 - Windows 10"
    },
    {
      id: "3",
      userId: "2",
      userEmail: "manager@example.com",
      action: "login",
      timestamp: "2023-09-15 09:12:33",
      ipAddress: "192.168.1.5",
      deviceInfo: "Firefox 97.0 - macOS 12.2"
    },
    {
      id: "4",
      userId: "3",
      userEmail: "user@example.com",
      action: "login",
      timestamp: "2023-09-18 14:05:44",
      ipAddress: "192.168.1.10",
      deviceInfo: "Safari 15.3 - iOS 15.3"
    }
  ]);

  const [userActions, setUserActions] = useState<UserAction[]>([
    {
      id: "1",
      userId: "1",
      userEmail: "admin@example.com",
      action: "create",
      details: "A créé un nouveau client: Entreprise ABC",
      timestamp: "2023-09-10 09:15:22",
      module: "clients"
    },
    {
      id: "2",
      userId: "1",
      userEmail: "admin@example.com",
      action: "update",
      details: "A modifié les paramètres de TVA",
      timestamp: "2023-09-10 10:32:45",
      module: "settings"
    },
    {
      id: "3",
      userId: "2",
      userEmail: "manager@example.com",
      action: "create",
      details: "A créé une nouvelle facture: FAC-2023-0042",
      timestamp: "2023-09-15 10:22:18",
      module: "invoices"
    },
    {
      id: "4",
      userId: "3",
      userEmail: "user@example.com",
      action: "view",
      details: "A consulté la liste des formulations",
      timestamp: "2023-09-18 14:35:12",
      module: "formulations"
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);

  const addUserForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "user"
    }
  });

  const addRoleForm = useForm({
    defaultValues: {
      name: "",
      description: ""
    }
  });

  // List of all available modules in the application
  const availableModules = [
    { id: "dashboard", name: "Tableau de bord" },
    { id: "clients", name: "Clients" },
    { id: "suppliers", name: "Fournisseurs" },
    { id: "finance", name: "Finances" },
    { id: "invoices", name: "Factures" },
    { id: "quotes", name: "Devis" },
    { id: "orders", name: "Commandes" },
    { id: "production", name: "Production" },
    { id: "formulations", name: "Formulations" },
    { id: "vehicles", name: "Véhicules" },
    { id: "expenses", name: "Dépenses" },
    { id: "payments", name: "Paiements" },
    { id: "reports", name: "Rapports" },
    { id: "employees", name: "Employés" },
    { id: "settings", name: "Paramètres" }
  ];

  // List of all possible actions per module
  const availableActions = [
    { id: "view", name: "Consulter" },
    { id: "create", name: "Créer" },
    { id: "update", name: "Modifier" },
    { id: "delete", name: "Supprimer" },
    { id: "export", name: "Exporter" },
    { id: "print", name: "Imprimer" },
    { id: "approve", name: "Approuver" },
    { id: "reject", name: "Rejeter" },
    { id: "archive", name: "Archiver" },
    { id: "restore", name: "Restaurer" }
  ];

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, active: !user.active };
      }
      return user;
    }));
    toast.success("Statut d'utilisateur mis à jour");
  };

  const handleChangeUserRole = (userId: string, newRole: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    }));
    toast.success("Rôle d'utilisateur mis à jour");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("Utilisateur supprimé");
  };

  const handleDeleteRole = (roleId: string) => {
    if (users.some(user => user.role === roles.find(r => r.id === roleId)?.name)) {
      toast.error("Impossible de supprimer un rôle utilisé par des utilisateurs");
      return;
    }
    setRoles(roles.filter(role => role.id !== roleId));
    toast.success("Rôle supprimé");
  };

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId === selectedRole ? null : roleId);
  };

  const handleAddUser = (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Math.random().toString(36).substring(7),
        email: data.email,
        role: data.role,
        active: true,
        lastLogin: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, newUser]);
      setShowAddUserForm(false);
      addUserForm.reset();
      setIsLoading(false);
      toast.success("Nouvel utilisateur ajouté");
    }, 1000);
  };

  const handleAddRole = (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRole = {
        id: Math.random().toString(36).substring(7),
        name: data.name,
        description: data.description,
        permissions: []
      };
      
      setRoles([...roles, newRole]);
      setShowAddRoleForm(false);
      addRoleForm.reset();
      setIsLoading(false);
      toast.success("Nouveau rôle ajouté");
    }, 1000);
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Paramètres d'authentification mis à jour avec succès");
    }, 1500);
  };

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
            <div className="p-3 rounded-lg bg-red-100">
              <Lock className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Authentification</h1>
              <p className="text-gray-400 mt-1">Gérer les utilisateurs et les rôles</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900 border border-gray-700">
          <TabsTrigger value="users" className="data-[state=active]:bg-gray-800">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Utilisateurs</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-gray-800">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Rôles & Permissions</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gray-800">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Historique des connexions</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-gray-800">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Journal d'activité</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Gestion des utilisateurs</CardTitle>
                <CardDescription className="text-gray-400">
                  Gérer les utilisateurs et leurs accès
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowAddUserForm(!showAddUserForm)}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </CardHeader>
            <CardContent>
              {showAddUserForm && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 border border-gray-700 bg-gray-900 rounded-lg"
                >
                  <h3 className="text-white font-medium mb-4">Nouvel utilisateur</h3>
                  <Form {...addUserForm}>
                    <form onSubmit={addUserForm.handleSubmit(handleAddUser)} className="space-y-4">
                      <FormField
                        control={addUserForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="email@example.com" 
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addUserForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Mot de passe</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addUserForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Rôle</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Sélectionner un rôle" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                {roles.map(role => (
                                  <SelectItem key={role.id} value={role.name}>
                                    {role.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowAddUserForm(false)}
                          className="border-gray-700 text-gray-300"
                        >
                          Annuler
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          {isLoading ? "Ajout en cours..." : "Ajouter l'utilisateur"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}
              
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-900">
                    <TableRow className="border-gray-700">
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Rôle</TableHead>
                      <TableHead className="text-white text-center">Statut</TableHead>
                      <TableHead className="text-white">Dernière connexion</TableHead>
                      <TableHead className="text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select 
                            defaultValue={user.role} 
                            onValueChange={(value) => handleChangeUserRole(user.id, value)}
                          >
                            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              {roles.map(role => (
                                <SelectItem key={role.id} value={role.name}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={user.active}
                            onCheckedChange={() => handleToggleUserStatus(user.id)}
                          />
                        </TableCell>
                        <TableCell className="text-gray-300">{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <Card className="bg-gray-800 border-gray-700 shadow-lg h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Rôles</CardTitle>
                    <CardDescription className="text-gray-400">
                      Définir les rôles système
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowAddRoleForm(!showAddRoleForm)}
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </CardHeader>
                <CardContent>
                  {showAddRoleForm && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 border border-gray-700 bg-gray-900 rounded-lg"
                    >
                      <h3 className="text-white font-medium mb-4">Nouveau rôle</h3>
                      <Form {...addRoleForm}>
                        <form onSubmit={addRoleForm.handleSubmit(handleAddRole)} className="space-y-4">
                          <FormField
                            control={addRoleForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Nom du rôle</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="ex: manager" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addRoleForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Description</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Description du rôle" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end space-x-2 pt-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setShowAddRoleForm(false)}
                              className="border-gray-700 text-gray-300"
                            >
                              Annuler
                            </Button>
                            <Button 
                              type="submit" 
                              disabled={isLoading}
                              className="bg-blue-600 hover:bg-blue-500 text-white"
                            >
                              {isLoading ? "Ajout en cours..." : "Ajouter le rôle"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                  
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <div 
                        key={role.id}
                        onClick={() => handleSelectRole(role.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedRole === role.id 
                            ? "border-blue-500 bg-gray-700" 
                            : "border-gray-700 bg-gray-900 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-white">{role.name}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRole(role.id);
                            }}
                            className="h-7 w-7 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-gray-400 text-sm mt-1">{role.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-7">
              <Card className="bg-gray-800 border-gray-700 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-white">Permissions</CardTitle>
                  <CardDescription className="text-gray-400">
                    Définir les permissions pour chaque rôle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedRole ? (
                    <div className="space-y-6">
                      <div className="text-white font-medium">
                        {roles.find(r => r.id === selectedRole)?.name} - Permissions
                      </div>
                      
                      <div className="space-y-3">
                        {availableModules.map((module) => (
                          <div key={module.id} className="border border-gray-700 rounded-lg bg-gray-900 overflow-hidden">
                            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                              <div className="text-white font-medium">{module.name}</div>
                              <Switch 
                                defaultChecked={
                                  roles.find(r => r.id === selectedRole)?.name === "admin" ||
                                  (roles.find(r => r.id === selectedRole)?.name === "manager" && 
                                   module.id !== "settings")
                                } 
                              />
                            </div>
                            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {availableActions.map((action) => (
                                <div key={`${module.id}-${action.id}`} className="flex items-center justify-between">
                                  <div className="text-gray-300 text-sm">{action.name}</div>
                                  <Switch 
                                    defaultChecked={
                                      roles.find(r => r.id === selectedRole)?.name === "admin" ||
                                      (roles.find(r => r.id === selectedRole)?.name === "manager" && 
                                       !(module.id === "settings" && action.id === "delete")) ||
                                      (roles.find(r => r.id === selectedRole)?.name === "user" && 
                                       action.id === "view")
                                    } 
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button
                          onClick={handleSaveSettings}
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
                              <span>Enregistrer les permissions</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                      <Shield className="h-12 w-12 mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-1">Sélectionnez un rôle</h3>
                      <p className="text-sm max-w-md">
                        Veuillez sélectionner un rôle dans la liste pour configurer ses permissions
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Historique des connexions</CardTitle>
              <CardDescription className="text-gray-400">
                Suivi des connexions et déconnexions des utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-900">
                    <TableRow className="border-gray-700">
                      <TableHead className="text-white">Utilisateur</TableHead>
                      <TableHead className="text-white">Action</TableHead>
                      <TableHead className="text-white">Date & Heure</TableHead>
                      <TableHead className="text-white">Adresse IP</TableHead>
                      <TableHead className="text-white">Appareil</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {authLogs.map((log) => (
                      <TableRow key={log.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          {log.userEmail}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            log.action === 'login' 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-orange-900 text-orange-300'
                          }`}>
                            {log.action === 'login' ? 'Connexion' : 'Déconnexion'}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-300">{log.timestamp}</TableCell>
                        <TableCell className="text-gray-300">{log.ipAddress}</TableCell>
                        <TableCell className="text-gray-300">{log.deviceInfo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300"
                >
                  Exporter les logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Journal d'activité</CardTitle>
              <CardDescription className="text-gray-400">
                Suivi des actions effectuées par les utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-900">
                    <TableRow className="border-gray-700">
                      <TableHead className="text-white">Utilisateur</TableHead>
                      <TableHead className="text-white">Module</TableHead>
                      <TableHead className="text-white">Action</TableHead>
                      <TableHead className="text-white">Détails</TableHead>
                      <TableHead className="text-white">Date & Heure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActions.map((action) => (
                      <TableRow key={action.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          {action.userEmail}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-900 text-blue-300">
                            {action.module}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            action.action === 'create' 
                              ? 'bg-green-900 text-green-300' 
                              : action.action === 'update'
                                ? 'bg-yellow-900 text-yellow-300'
                                : action.action === 'delete'
                                  ? 'bg-red-900 text-red-300'
                                  : 'bg-blue-900 text-blue-300'
                          }`}>
                            {action.action}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-300">{action.details}</TableCell>
                        <TableCell className="text-gray-300">{action.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end mt-4 gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Filtrer par module" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">Tous les modules</SelectItem>
                    {availableModules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300"
                >
                  Exporter le journal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
