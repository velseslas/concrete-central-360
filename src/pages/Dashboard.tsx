import DashboardStats from "@/components/dashboard/DashboardStats";
import MaterialsTable from "@/components/dashboard/MaterialsTable";
import ProductionChart from "@/components/dashboard/ProductionChart";
import StockAlerts from "@/components/dashboard/StockAlerts";
import { OverviewWidget } from "@/components/dashboard/OverviewWidget";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      
      <div className="grid gap-6">
        <OverviewWidget />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <DashboardStats />
            <MaterialsTable />
          </div>
          <div className="space-y-6">
            <ProductionChart />
            <StockAlerts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;