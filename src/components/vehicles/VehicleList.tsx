
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Car, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Car className="h-6 w-6 text-[#9b87f5]" />
            Liste des Véhicules
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center text-gray-400">Chargement...</div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {vehicles?.map((vehicle: any, index: number) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
                  onClick={() => onEdit?.(vehicle)}
                >
                  <div className="flex items-start mb-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{vehicle.brand} {vehicle.model}</h3>
                      <span className={`text-sm px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block
                        ${vehicle.status === "active" ? "bg-green-500/20 text-green-400" :
                        vehicle.status === "maintenance" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"}`}
                      >
                        {vehicle.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-300 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Immatriculation: {vehicle.license_plate}
                    </p>
                    {vehicle.location && (
                      <p className="text-sm text-gray-300 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        Localisation: {vehicle.location}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
                    >
                      Voir les détails
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default VehicleList;
