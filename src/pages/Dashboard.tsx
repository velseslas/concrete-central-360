import DashboardStats from "@/components/dashboard/DashboardStats";
import StockAlerts from "@/components/dashboard/StockAlerts";
import ProductionChart from "@/components/dashboard/ProductionChart";
import MaterialsTable from "@/components/dashboard/MaterialsTable";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Tableau de bord</h1>
        <p className="text-gray-500">Vue d'ensemble de votre activité</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-dashboard">
          <h2 className="text-lg font-semibold mb-4">Production hebdomadaire</h2>
          <ProductionChart />
        </div>

        <div className="card-dashboard">
          <h2 className="text-lg font-semibold mb-4">Alertes stock</h2>
          <StockAlerts />
        </div>
      </div>

      <div className="card-dashboard">
        <h2 className="text-lg font-semibold mb-4">État des stocks</h2>
        <MaterialsTable />
      </div>
    </div>
  );
};

export default Dashboard;