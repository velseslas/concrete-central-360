import DashboardStats from "@/components/dashboard/DashboardStats";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-gray-500">Vue d'ensemble de votre activité</p>
      </div>
      <DashboardStats />
    </div>
  );
};

export default Dashboard;