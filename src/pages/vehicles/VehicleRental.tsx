
import { motion } from "framer-motion";
import { ClipboardList, CalendarDays, FileText, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rentalStats = [
  {
    title: "Véhicules en Location",
    value: "8",
    change: "+2",
    icon: ClipboardList,
    color: "text-green-500"
  },
  {
    title: "Locations à venir",
    value: "3",
    change: "+1",
    icon: CalendarDays,
    color: "text-blue-500"
  },
  {
    title: "Contrats actifs",
    value: "12",
    change: "+4",
    icon: FileText,
    color: "text-purple-500"
  },
  {
    title: "Taux d'occupation",
    value: "75%",
    change: "+8%",
    icon: BarChart3,
    color: "text-yellow-500"
  }
];

const VehicleRental = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gestion des Locations</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {rentalStats.map((stat, index) => (
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
              <p className={`text-xs ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Locations en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">Camion Benne #{i + 1}</p>
                    <p className="text-xs text-gray-400">Client: Entreprise XYZ</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">12/03/24 - 15/03/24</p>
                    <p className="text-xs text-green-400">En cours</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Réservations à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">Chargeuse #{i + 1}</p>
                    <p className="text-xs text-gray-400">Client: Construction ABC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">20/03/24 - 25/03/24</p>
                    <p className="text-xs text-yellow-400">À venir</p>
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

export default VehicleRental;
