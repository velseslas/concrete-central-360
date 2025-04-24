import DashboardStats from "@/components/dashboard/DashboardStats";
import MaterialsTable from "@/components/dashboard/MaterialsTable";
import { OverviewWidget } from "@/components/dashboard/OverviewWidget";
import { motion } from "framer-motion";
const Dashboard = () => {
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1c2e] to-gray-900 text-white">
      <div className="container mx-auto p-8 space-y-8 py-0">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="flex flex-col gap-8">
          <div className="grid gap-8">
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl p-6">
              <OverviewWidget />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5,
              delay: 0.4
            }} className="lg:col-span-2 space-y-8">
                <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 p-6 shadow-lg hover:shadow-xl">
                  <DashboardStats />
                </div>
                <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 p-6 shadow-lg hover:shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6]">
                    État des stocks
                  </h2>
                  <MaterialsTable />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
};
export default Dashboard;