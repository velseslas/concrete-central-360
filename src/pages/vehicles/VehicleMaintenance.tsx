
import { motion } from "framer-motion";
import { ArrowLeft, Wrench, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const maintenanceStats = [
  {
    title: "En maintenance",
    value: "3",
    status: "en-cours",
    icon: Wrench,
    color: "text-orange-500"
  },
  {
    title: "Maintenance urgente",
    value: "2",
    status: "urgent",
    icon: AlertCircle,
    color: "text-red-500"
  },
  {
    title: "Planifiées",
    value: "5",
    status: "planifie",
    icon: Clock,
    color: "text-blue-500"
  },
  {
    title: "Complétées",
    value: "8",
    status: "complete",
    icon: CheckCircle2,
    color: "text-green-500"
  }
];

const VehicleMaintenance = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link to="/vehicles">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux véhicules
          </Button>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {maintenanceStats.map((stat) => (
          <Card key={stat.title} className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-400">véhicules</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 grid-cols-1">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Maintenances en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Camion #{i}</h3>
                      <p className="text-sm text-gray-400">Maintenance régulière</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">Début: {new Date().toLocaleDateString()}</p>
                    <p className="text-xs text-orange-500">En cours</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleMaintenance;
