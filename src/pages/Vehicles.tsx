
import { motion } from "framer-motion";
import { Car, FileText, AlertTriangle, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import VehicleSheetContent from "@/components/vehicles/VehicleSheetContent";
import { VehicleWidget } from "@/components/vehicles/widgets/VehicleWidget";
import { LocationWidget } from "@/components/vehicles/widgets/LocationWidget";
import { DocumentWidget } from "@/components/vehicles/widgets/DocumentWidget";
import { RentalReportWidget } from "@/components/vehicles/widgets/RentalReportWidget";

const Vehicles = () => {
  const stats = [
    { 
      title: "Véhicules Actifs", 
      value: "12", 
      icon: Car, 
      color: "text-green-400",
      items: [],
      type: 'active' as const
    },
    { 
      title: "En Maintenance", 
      value: "3", 
      icon: Settings, 
      color: "text-orange-400",
      items: [],
      type: 'maintenance' as const,
      isPulsing: true
    },
    { 
      title: "Alerte Documents", 
      value: "4", 
      icon: AlertTriangle, 
      color: "text-red-400",
      isPulsing: true,
      items: [],
      type: 'documents' as const
    },
    {
      title: "Véhicules en Panne",
      value: "2",
      icon: Car,
      color: "text-red-400",
      isPulsing: true,
      items: [],
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VehicleWidget />
          <LocationWidget />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentWidget />
          <RentalReportWidget />
        </div>
      </motion.div>
    </div>
  );
};

export default Vehicles;
