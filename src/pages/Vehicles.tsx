import { motion } from "framer-motion";
import { Car, FileText, AlertTriangle, Settings, Calendar } from "lucide-react";
import VehicleList from "@/components/vehicles/VehicleList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import VehicleSheetContent from "@/components/vehicles/VehicleSheetContent";

const Vehicles = () => {
  const handleEdit = (vehicle: any) => {
    console.log("Editing vehicle:", vehicle);
  };

  const documentsToRenew = [
    {
      vehicle: "Mercedes Actros",
      document: "Assurance",
      expiry: "2024-12-31"
    },
    {
      vehicle: "Volvo FH16",
      document: "Contrôle technique",
      expiry: "2024-05-31"
    }
  ];

  const brokenVehicles = [
    {
      vehicle: "Scania R500",
      issue: "Problème de transmission",
      since: "2024-03-15"
    },
    {
      vehicle: "MAN TGX",
      issue: "Panne moteur",
      since: "2024-03-18"
    }
  ];

  const activeVehicles = [
    { vehicle: "Mercedes Actros", status: "En mission", location: "Casablanca" },
    { vehicle: "Volvo FH16", status: "En route", location: "Rabat" },
    { vehicle: "MAN TGX", status: "Disponible", location: "Dépôt" }
  ];

  const maintenanceVehicles = [
    { vehicle: "Renault T460", type: "Vidange", duration: "2 heures" },
    { vehicle: "DAF XF", type: "Révision", duration: "4 heures" },
    { vehicle: "Iveco S-Way", type: "Pneus", duration: "1 heure" }
  ];

  const alertCount = documentsToRenew.length;
  const hasAlerts = alertCount > 0;
  const brokenCount = brokenVehicles.length;
  const maintenanceCount = maintenanceVehicles.length;

  const stats = [
    { 
      title: "Véhicules Actifs", 
      value: activeVehicles.length, 
      icon: Car, 
      color: "text-green-400",
      items: activeVehicles,
      type: 'active' as const
    },
    { 
      title: "En Maintenance", 
      value: maintenanceCount, 
      icon: Settings, 
      color: "text-orange-400",
      items: maintenanceVehicles,
      type: 'maintenance' as const,
      isPulsing: maintenanceCount > 0
    },
    { 
      title: "Alerte Documents", 
      value: alertCount, 
      icon: AlertTriangle, 
      color: "text-red-400",
      isPulsing: hasAlerts,
      items: documentsToRenew,
      type: 'documents' as const
    },
    {
      title: "Véhicules en Panne",
      value: brokenCount,
      icon: Car,
      color: "text-red-400",
      isPulsing: brokenCount > 0,
      items: brokenVehicles,
      type: 'broken' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-end items-center">
          <div className="flex gap-2">
            {[
              { icon: Settings, label: "Paramètres" },
              { icon: Calendar, label: "Planning" },
              { icon: FileText, label: "Documents" },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-2 rounded-xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
              >
                <item.icon className="h-5 w-5 text-gray-300" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Sheet>
                <SheetTrigger asChild>
                  <Card className={`bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer ${
                    stat.isPulsing ? 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''
                  }`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-gray-300">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-5 w-5 ${stat.color} ${stat.isPulsing ? 'animate-[pulse_1.5s_ease-in-out_infinite]' : ''}`} />
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${stat.isPulsing ? `${stat.color} animate-[pulse_1.5s_ease-in-out_infinite]` : 'text-white'}`}>
                        {stat.value}
                      </div>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                <VehicleSheetContent items={stat.items} type={stat.type} />
              </Sheet>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <VehicleList onEdit={handleEdit} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Vehicles;