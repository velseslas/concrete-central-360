
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeesList } from "@/components/employees/EmployeesList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { EmployeePositions } from "@/components/employees/EmployeePositions";
import { EmployeeSchedules } from "@/components/employees/EmployeeSchedules";
import { EmployeeStats } from "@/components/employees/EmployeeStats";
import { motion } from "framer-motion";

export default function Employees() {
  const [activeTab, setActiveTab] = useState("list");
  
  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-white">Gestion des Employés</h1>
        <p className="text-gray-400 mt-2">Gérez votre personnel, les horaires et les rôles</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 gap-2 bg-gray-800 text-gray-400">
          <TabsTrigger value="list" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Liste des employés
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Nouvel employé
          </TabsTrigger>
          <TabsTrigger value="positions" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Postes & Rôles
          </TabsTrigger>
          <TabsTrigger value="schedules" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Horaires & Présence
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Statistiques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Liste des employés</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Ajouter un nouvel employé</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Gestion des postes et rôles</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeePositions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Planification des horaires</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeSchedules />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Statistiques du personnel</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeStats />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
