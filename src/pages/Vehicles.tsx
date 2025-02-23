
import { motion } from "framer-motion";
import { Car, FileText, AlertTriangle, Settings, MapPin, ClipboardCheck, Wrench, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import VehicleSheetContent from "@/components/vehicles/VehicleSheetContent";

const widgets = [
  {
    title: "Véhicules Actifs",
    value: "12",
    icon: Car,
    color: "text-green-400",
    bgGradient: "from-green-500/10 to-green-500/5",
    borderColor: "border-green-500/20",
    description: "Véhicules en service"
  },
  {
    title: "En Maintenance",
    value: "3",
    icon: Wrench,
    color: "text-orange-400",
    bgGradient: "from-orange-500/10 to-orange-500/5",
    borderColor: "border-orange-500/20",
    description: "Véhicules en réparation"
  },
  {
    title: "Documents à Renouveler",
    value: "4",
    icon: FileText,
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/10 to-yellow-500/5",
    borderColor: "border-yellow-500/20",
    description: "Documents expirant bientôt"
  },
  {
    title: "En Panne",
    value: "2",
    icon: AlertTriangle,
    color: "text-red-400",
    bgGradient: "from-red-500/10 to-red-500/5",
    borderColor: "border-red-500/20",
    description: "Véhicules hors service"
  },
  {
    title: "Localisation",
    icon: MapPin,
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-500/20",
    description: "Position des véhicules",
    content: "Vue d'ensemble de la flotte"
  },
  {
    title: "Inspections",
    icon: ClipboardCheck,
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-purple-500/5",
    borderColor: "border-purple-500/20",
    description: "Contrôles techniques",
    content: "Planification des inspections"
  },
  {
    title: "Maintenance Planifiée",
    icon: Calendar,
    color: "text-indigo-400",
    bgGradient: "from-indigo-500/10 to-indigo-500/5",
    borderColor: "border-indigo-500/20",
    description: "Entretiens programmés",
    content: "Calendrier des maintenances"
  },
  {
    title: "État de la Flotte",
    icon: Settings,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/10 to-cyan-500/5",
    borderColor: "border-cyan-500/20",
    description: "Vue d'ensemble",
    content: "Statistiques globales"
  }
];

const Vehicles = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {widgets.map((widget, index) => (
            <motion.div
              key={widget.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Sheet>
                <SheetTrigger className="w-full">
                  <Card className={`w-full group bg-gray-800/50 backdrop-blur-lg border ${widget.borderColor} hover:bg-gray-700/50 transition-all duration-300 cursor-pointer`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${widget.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300 rounded-lg`} />
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative">
                      <CardTitle className="text-sm font-medium text-gray-300">
                        {widget.title}
                      </CardTitle>
                      <widget.icon className={`h-5 w-5 ${widget.color}`} />
                    </CardHeader>
                    <CardContent className="relative">
                      {widget.value && (
                        <div className={`text-2xl font-bold mb-1 ${widget.color}`}>
                          {widget.value}
                        </div>
                      )}
                      <p className="text-sm text-gray-400">
                        {widget.description}
                      </p>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md bg-gray-900/95 border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-white flex items-center gap-2">
                      <widget.icon className={`h-5 w-5 ${widget.color}`} />
                      {widget.title}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                        <p className="text-gray-400">{widget.content || "Contenu détaillé à venir"}</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Vehicles;
