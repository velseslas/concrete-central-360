import DashboardStats from "@/components/dashboard/DashboardStats";
import MaterialsTable from "@/components/dashboard/MaterialsTable";
import ProductionChart from "@/components/dashboard/ProductionChart";
import StockAlerts from "@/components/dashboard/StockAlerts";
import { OverviewWidget } from "@/components/dashboard/OverviewWidget";
import { motion } from "framer-motion";
import { DashboardMenu } from "@/components/dashboard/DashboardMenu";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Tableau de bord
            </h1>
            <DashboardMenu />
          </div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6">
                <OverviewWidget />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6">
                  <DashboardStats />
                </div>
                <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6">
                  <MaterialsTable />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6">
                  <ProductionChart />
                </div>
                <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6">
                  <StockAlerts />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;