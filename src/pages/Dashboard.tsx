import DashboardStats from "@/components/dashboard/DashboardStats";
import StockAlerts from "@/components/dashboard/StockAlerts";
import ProductionChart from "@/components/dashboard/ProductionChart";
import MaterialsTable from "@/components/dashboard/MaterialsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Truck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Tableau de bord</h1>
          <p className="text-gray-500">Vue d'ensemble de votre activité</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Production hebdomadaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductionChart />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Alertes stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StockAlerts />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stocks" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="stocks">État des stocks</TabsTrigger>
          <TabsTrigger value="production">Production en cours</TabsTrigger>
          <TabsTrigger value="deliveries">Livraisons du jour</TabsTrigger>
        </TabsList>
        <TabsContent value="stocks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>État des stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <MaterialsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="production" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Production en cours</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Table de production à implémenter */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deliveries" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Livraisons du jour</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Table des livraisons à implémenter */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;