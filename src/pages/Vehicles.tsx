
import { motion } from "framer-motion";
import { Car, FileText, AlertTriangle, Settings, MapPin, ClipboardCheck, Wrench, Calendar, List, FileArchive } from "lucide-react";
import { Link } from "react-router-dom";

const widgets = [
  {
    title: "Véhicules Actifs",
    value: "12",
    icon: Car,
    color: "text-green-400",
    bgGradient: "from-green-500/10 to-green-500/5",
    borderColor: "border-green-500/20",
    description: "Véhicules en service",
    route: "/vehicles/active"
  },
  {
    title: "En Maintenance",
    value: "3",
    icon: Wrench,
    color: "text-orange-400",
    bgGradient: "from-orange-500/10 to-orange-500/5",
    borderColor: "border-orange-500/20",
    description: "Véhicules en réparation",
    route: "/vehicles/maintenance"
  },
  {
    title: "Documents à Renouveler",
    value: "4",
    icon: FileText,
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/10 to-yellow-500/5",
    borderColor: "border-yellow-500/20",
    description: "Documents expirant bientôt",
    route: "/vehicles/documents-renewal"
  },
  {
    title: "En Panne",
    value: "2",
    icon: AlertTriangle,
    color: "text-red-400",
    bgGradient: "from-red-500/10 to-red-500/5",
    borderColor: "border-red-500/20",
    description: "Véhicules hors service",
    route: "/vehicles/broken"
  },
  {
    title: "Liste des Véhicules",
    icon: List,
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-500/20",
    description: "Parc complet",
    route: "/vehicles/list"
  },
  {
    title: "Documents Véhicules",
    icon: FileArchive,
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-purple-500/5",
    borderColor: "border-purple-500/20",
    description: "Gestion documentaire",
    route: "/vehicles/documents"
  },
  {
    title: "Localisation",
    icon: MapPin,
    color: "text-indigo-400",
    bgGradient: "from-indigo-500/10 to-indigo-500/5",
    borderColor: "border-indigo-500/20",
    description: "Position des véhicules",
    route: "/vehicles/location"
  },
  {
    title: "LOCATION",
    icon: Settings,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/10 to-cyan-500/5",
    borderColor: "border-cyan-500/20",
    description: "Vue d'ensemble",
    route: "/vehicles/rental"
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
              <Link to={widget.route} className="block w-full">
                <div className="w-full group bg-[#101422] rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <div className="text-sm font-medium text-gray-300">
                      {widget.title}
                    </div>
                    <widget.icon className={`h-5 w-5 ${widget.color}`} />
                  </div>
                  <div>
                    {widget.value && (
                      <div className={`text-2xl font-bold mb-1 ${widget.color}`}>
                        {widget.value}
                      </div>
                    )}
                    <p className="text-sm text-gray-400">
                      {widget.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Vehicles;
