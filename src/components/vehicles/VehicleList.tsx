
import { motion } from "framer-motion";
import { Car, Calendar, MapPin, Mail, Phone, Building } from "lucide-react";
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

  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">Chargement...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {vehicles?.map((vehicle: any, index: number) => (
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 hover:border-[#7C3AED] transition-all"
          onClick={() => onEdit?.(vehicle)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-[#9b87f5]" />
              <h3 className="text-xl font-semibold text-white">{vehicle.brand} {vehicle.model}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">Immatriculation: {vehicle.license_plate}</span>
              </div>
              
              {vehicle.location && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">Localisation: {vehicle.location}</span>
                </div>
              )}
            </div>
            
            <div className="pt-2">
              <span className={`text-sm px-2 py-1 rounded-full text-xs font-medium inline-block
                ${vehicle.status === "active" ? "bg-green-500/20 text-green-400" :
                vehicle.status === "maintenance" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-red-500/20 text-red-400"}`}
              >
                {vehicle.status}
              </span>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full mt-2 bg-[#1e293b] hover:bg-[#334155] text-white"
            >
              Voir les détails
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default VehicleList;
