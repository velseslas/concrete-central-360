import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Car, Plus, Search, Settings, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VehicleListProps {
  onEdit?: (vehicle: any) => void;
}

export function VehicleList({ onEdit }: VehicleListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="h-6 w-6 text-[#9b87f5]" />
              Liste des Véhicules
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher un véhicule..." 
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                />
              </div>
              <Button variant="outline" size="sm" className="text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Véhicule
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "VEH-001", marque: "Mercedes", modele: "Actros", immatriculation: "123 ABC 16", status: "En service", prochainControle: "15/04/2024" },
              { id: "VEH-002", marque: "Volvo", modele: "FH16", immatriculation: "456 DEF 16", status: "En maintenance", prochainControle: "20/04/2024" },
              { id: "VEH-003", marque: "Scania", modele: "R500", immatriculation: "789 GHI 16", status: "En service", prochainControle: "25/04/2024" },
              { id: "VEH-004", marque: "MAN", modele: "TGX", immatriculation: "012 JKL 16", status: "En panne", prochainControle: "30/04/2024" },
            ].map((vehicule) => (
              <div
                key={vehicule.id}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#9b87f5]" />
                      {vehicule.marque} {vehicule.modele}
                    </h3>
                    <p className="text-gray-400 text-sm">{vehicule.immatriculation}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#9b87f5]" />
                      <span className="text-sm text-gray-300">
                        Prochain contrôle: {vehicule.prochainControle}
                      </span>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        vehicule.status === "En service" ? "bg-green-500/20 text-green-400" :
                        vehicule.status === "En panne" ? "bg-red-500/20 text-red-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {vehicule.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-[#9b87f5]/20"
                        onClick={() => onEdit?.(vehicule)}
                      >
                        <Settings className="h-4 w-4 text-[#9b87f5]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-[#9b87f5]/20"
                      >
                        <FileText className="h-4 w-4 text-[#9b87f5]" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default VehicleList;