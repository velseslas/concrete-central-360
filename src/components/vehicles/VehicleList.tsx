
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Car, Plus, Search, Settings, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface VehicleListProps {
  onEdit?: (vehicle: any) => void;
}

export function VehicleList({ onEdit }: VehicleListProps) {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error("Erreur lors du chargement des véhicules");
        throw error;
      }
      
      return data;
    }
  });

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
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center text-gray-400">Chargement...</div>
            ) : vehicles?.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => {
                  console.log("Vehicle clicked:", vehicle);
                  onEdit?.(vehicle);
                }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#9b87f5]" />
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-gray-400 text-sm">{vehicle.license_plate}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#9b87f5]" />
                      <span className="text-sm text-gray-300">
                        Prochain contrôle: {new Date(vehicle.next_control_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        vehicle.status === "active" ? "bg-green-500/20 text-green-400" :
                        vehicle.status === "maintenance" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {vehicle.status}
                      </span>
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
