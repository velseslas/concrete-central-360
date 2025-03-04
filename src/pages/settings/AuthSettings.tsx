
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, Save, User, Users, Shield, Check, Plus, Trash2 } from "lucide-react";
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

export default function AuthSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
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

      <Tabs defaultValue="users" className="space-y-6">
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
                        <div className="space-y-3">
                          <div className="text-gray-300 font-medium">Modules</div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Accès au tableau de bord</div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Accès aux clients</div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Accès aux fournisseurs</div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Accès aux finances</div>
                            <Switch defaultChecked={roles.find(r => r.id === selectedRole)?.name !== "user"} />
                          </div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Accès aux paramètres</div>
                            <Switch defaultChecked={roles.find(r => r.id === selectedRole)?.name === "admin"} />
                          </div>
                        </div>
                        
                        <div className="space-y-3 mt-6">
                          <div className="text-gray-300 font-medium">Actions</div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Créer des clients</div>
                            <Switch defaultChecked={roles.find(r => r.id === selectedRole)?.name !== "user"} />
                          </div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Modifier des clients</div>
                            <Switch defaultChecked={roles.find(r => r.id === selectedRole)?.name !== "user"} />
                          </div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Supprimer des clients</div>
                            <Switch defaultChecked={roles.find(r => r.id === selectedRole)?.name === "admin"} />
                          </div>
                          
                          <div className="p-3 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
                            <div className="text-gray-300">Gérer les factures</div>
                            <Switch defaultChecked={roles.find(r => r.id === selectedRole)?.name !== "user"} />
                          </div>
                        </div>
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
      </Tabs>
    </div>
  );
}
