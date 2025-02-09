
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function LocationWidget() {
  const { data: locations, isLoading } = useQuery({
    queryKey: ['vehicle-locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_locations')
        .select(`
          *,
          vehicles (
            brand,
            model,
            license_plate
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error("Erreur lors du chargement des localisations");
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#9b87f5]" />
              Localisation des Véhicules
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-white hover:bg-[#9b87f5]/20 transition-colors"
              onClick={() => console.log("Add new location")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Localisation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center text-gray-400">Chargement...</div>
            ) : locations?.map((location) => (
              <div
                key={location.id}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium">
                      {location.vehicles?.brand} {location.vehicles?.model}
                    </h3>
                    <p className="text-gray-400 text-sm">{location.vehicles?.license_plate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#9b87f5]" />
                    <span className="text-white">{location.location}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Depuis le {new Date(location.start_date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
