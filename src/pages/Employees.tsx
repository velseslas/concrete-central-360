
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeesList } from "@/components/employees/EmployeesList";
import { EmployeePositions } from "@/components/employees/EmployeePositions";
import { EmployeeSalary } from "@/components/employees/EmployeeSalary";
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
        <TabsList className="grid grid-cols-3 gap-2 bg-gray-800 text-gray-400">
          <TabsTrigger value="list" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Liste des employés
          </TabsTrigger>
          <TabsTrigger value="positions" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Postes & Rôles
          </TabsTrigger>
          <TabsTrigger value="salary" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Salaires & Primes
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

        <TabsContent value="salary">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Gestion des salaires et primes</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeSalary />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
