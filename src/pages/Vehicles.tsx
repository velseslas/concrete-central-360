import { motion } from "framer-motion";
import { Car, FileText, AlertTriangle, Settings, Calendar } from "lucide-react";
import VehicleList from "@/components/vehicles/VehicleList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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

  // Nombre d'alertes
  const alertCount = documentsToRenew.length;
  const hasAlerts = alertCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          </h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Véhicules Actifs", value: "12", icon: Car, color: "text-green-400" },
            { title: "En Maintenance", value: "3", icon: Settings, color: "text-orange-400" },
            { 
              title: "Alertes", 
              value: alertCount.toString(), 
              icon: AlertTriangle, 
              color: "text-red-400",
              isPulsing: hasAlerts,
              isAlert: true
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {stat.isAlert ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Card className={`bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer ${stat.isPulsing ? 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}`}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-300">
                          {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-5 w-5 ${stat.color} ${stat.isPulsing ? 'animate-[pulse_1.5s_ease-in-out_infinite]' : ''}`} />
                      </CardHeader>
                      <CardContent>
                        <div className={`text-2xl font-bold ${stat.isPulsing ? 'text-red-400 animate-[pulse_1.5s_ease-in-out_infinite]' : 'text-white'}`}>
                          {stat.value}
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="text-lg font-semibold text-white">Documents à Renouveler</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      {documentsToRenew.map((doc, index) => (
                        <div key={index} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-[#D6BCFA]">{doc.vehicle}</h3>
                              <p className="text-sm text-[#0EA5E9]">{doc.document}</p>
                            </div>
                            <div className="text-[#F97316] font-medium">
                              Expire le {new Date(doc.expiry).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Card className={`bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300`}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-100">
                Liste des Véhicules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VehicleList onEdit={handleEdit} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Vehicles;
