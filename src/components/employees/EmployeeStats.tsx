
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Clock, Calendar, HardHat, Briefcase, Wallet, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";

// Mock data for employee statistics
const departmentData = [
  { name: "Transport", value: 5, color: "#3b82f6" },
  { name: "Production", value: 3, color: "#8b5cf6" },
  { name: "Maintenance", value: 2, color: "#ec4899" },
  { name: "Administration", value: 1, color: "#10b981" },
  { name: "Ventes", value: 3, color: "#f59e0b" },
  { name: "Comptabilité", value: 1, color: "#6366f1" },
];

const attendanceData = [
  { name: "Jan", present: 95, absent: 5 },
  { name: "Fév", present: 92, absent: 8 },
  { name: "Mar", present: 98, absent: 2 },
  { name: "Avr", present: 97, absent: 3 },
  { name: "Mai", present: 94, absent: 6 },
  { name: "Juin", present: 96, absent: 4 },
];

const salaryData = [
  { name: "Jan", value: 42000 },
  { name: "Fév", value: 43500 },
  { name: "Mar", value: 45000 },
  { name: "Avr", value: 44800 },
  { name: "Mai", value: 45200 },
  { name: "Juin", value: 46000 },
];

export function EmployeeStats() {
  const [timePeriod, setTimePeriod] = useState("semester");
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Statistiques du personnel</h2>
          <p className="text-sm text-gray-400">Vue d'ensemble des performances et de la répartition du personnel</p>
        </div>
        
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600 text-white">
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
            <SelectItem value="semester">Ce semestre</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employés</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-400 mt-1">+2 depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
            <UserCheck className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <p className="text-xs text-gray-400 mt-1">+1.5% depuis le mois dernier</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Heures travaillées</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,436</div>
            <p className="text-xs text-gray-400 mt-1">+120 depuis le mois dernier</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Coût du personnel</CardTitle>
            <Wallet className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">46,000 €</div>
            <p className="text-xs text-gray-400 mt-1">+2% depuis le mois dernier</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 bg-gray-700">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="attendance">Présence</TabsTrigger>
          <TabsTrigger value="costs">Coûts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <HardHat className="h-5 w-5 mr-2 text-gray-400" />
                  Répartition par département
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value} employés`, 'Nombre']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                  Répartition par poste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: "Chauffeur", value: 5 },
                    { name: "Opérateur", value: 3 },
                    { name: "Technicien", value: 2 },
                    { name: "Responsable", value: 2 },
                    { name: "Commercial", value: 2 },
                    { name: "Comptable", value: 1 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                    <YAxis tick={{ fill: '#9ca3af' }} />
                    <Tooltip 
                      formatter={(value: any) => [`${value} employés`, 'Nombre']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-gray-400" />
                  Évolution des effectifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: "Jan", employees: 12 },
                    { month: "Fév", employees: 13 },
                    { month: "Mar", employees: 13 },
                    { month: "Avr", employees: 14 },
                    { month: "Mai", employees: 15 },
                    { month: "Juin", employees: 15 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" tick={{ fill: '#9ca3af' }} />
                    <YAxis tick={{ fill: '#9ca3af' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="employees" 
                      stroke="#3b82f6" 
                      activeDot={{ r: 8 }}
                      name="Employés"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                Statistiques de présence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={attendanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                  <YAxis tick={{ fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="present" name="Présence (%)" fill="#10b981" />
                  <Bar dataKey="absent" name="Absence (%)" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Top 5 des employés les plus présents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sophie Mercier", department: "Administration", rate: 100 },
                    { name: "Thomas Bernard", department: "Ventes", rate: 99 },
                    { name: "Jean Dupont", department: "Transport", rate: 98 },
                    { name: "Marie Lefebvre", department: "Production", rate: 97 },
                    { name: "Ahmed Bensalem", department: "Maintenance", rate: 95 },
                  ].map((employee, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-600 rounded">
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-400">{employee.department}</div>
                      </div>
                      <div className="text-green-500 font-bold">{employee.rate}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Absences par département</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Transport", value: 5, color: "#3b82f6" },
                        { name: "Production", value: 2, color: "#8b5cf6" },
                        { name: "Maintenance", value: 3, color: "#ec4899" },
                        { name: "Administration", value: 1, color: "#10b981" },
                        { name: "Ventes", value: 2, color: "#f59e0b" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value} jours`, 'Absences']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="costs" className="space-y-4">
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-gray-400" />
                Évolution des salaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={salaryData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                  <YAxis tick={{ fill: '#9ca3af' }} />
                  <Tooltip 
                    formatter={(value: any) => [`${value} €`, 'Montant']}
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    activeDot={{ r: 8 }}
                    name="Coût total"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Répartition des coûts par département</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { name: "Transport", value: 12000 },
                    { name: "Production", value: 9500 },
                    { name: "Maintenance", value: 8000 },
                    { name: "Administration", value: 7500 },
                    { name: "Ventes", value: 6000 },
                    { name: "Comptabilité", value: 3000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                    <YAxis tick={{ fill: '#9ca3af' }} />
                    <Tooltip 
                      formatter={(value: any) => [`${value} €`, 'Coût']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Heures supplémentaires par mois</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={[
                      { name: "Jan", value: 28 },
                      { name: "Fév", value: 32 },
                      { name: "Mar", value: 25 },
                      { name: "Avr", value: 35 },
                      { name: "Mai", value: 30 },
                      { name: "Juin", value: 38 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                    <YAxis tick={{ fill: '#9ca3af' }} />
                    <Tooltip 
                      formatter={(value: any) => [`${value} heures`, 'Heures supp.']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f59e0b" 
                      activeDot={{ r: 8 }}
                      name="Heures supp."
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
