
import { motion } from "framer-motion";
import { Car, FileText, AlertTriangle, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import VehicleSheetContent from "@/components/vehicles/VehicleSheetContent";

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
                <SheetTrigger className="w-full">
                  <Card className={`w-full bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer ${
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
          <Sheet>
            <SheetTrigger className="w-full">
              <Card className="w-full bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Car className="h-6 w-6 text-[#9b87f5]" />
                    Liste des Véhicules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="p-4 rounded-lg bg-gray-700/30 backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-white">Mercedes Actros {i + 1}</h3>
                            <p className="text-gray-400">123 ABC 1{i}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                            Actif
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md bg-gray-900/95 border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white">Détails des Véhicules</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-2">Mercedes Actros {i + 1}</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400"><span className="text-gray-300">Immatriculation:</span> 123 ABC 1{i}</p>
                        <p className="text-gray-400"><span className="text-gray-300">Statut:</span> Actif</p>
                        <p className="text-gray-400"><span className="text-gray-300">Dernière maintenance:</span> 15/03/2024</p>
                        <p className="text-gray-400"><span className="text-gray-300">Kilométrage:</span> 150,000 km</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger className="w-full">
              <Card className="w-full bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Car className="h-6 w-6 text-[#9b87f5]" />
                    Localisation des Véhicules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="p-4 rounded-lg bg-gray-700/30 backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-white">Mercedes Actros {i + 1}</h3>
                            <p className="text-gray-400">123 ABC 1{i}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#9b87f5]">Oran, Algérie</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">Dernière mise à jour: il y a 5 minutes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md bg-gray-900/95 border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white">Détails des Localisations</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-2">Mercedes Actros {i + 1}</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400"><span className="text-gray-300">Position actuelle:</span> Oran, Algérie</p>
                        <p className="text-gray-400"><span className="text-gray-300">Dernière mise à jour:</span> il y a 5 minutes</p>
                        <p className="text-gray-400"><span className="text-gray-300">Vitesse:</span> 60 km/h</p>
                        <p className="text-gray-400"><span className="text-gray-300">Direction:</span> Nord-Est</p>
                        <p className="text-gray-400"><span className="text-gray-300">Statut:</span> En mission</p>
                        <p className="text-gray-400"><span className="text-gray-300">Destination:</span> Alger</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Sheet>
            <SheetTrigger className="w-full">
              <Card className="w-full bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-6 w-6 text-[#9b87f5]" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>Document content</CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-white">Documents des Véhicules</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger className="w-full">
              <Card className="w-full bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-6 w-6 text-[#9b87f5]" />
                    Rapports de Location
                  </CardTitle>
                </CardHeader>
                <CardContent>Rental report content</CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-white">Rapports de Location</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </div>
  );
};

export default Vehicles;
