
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileSpreadsheet, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function RentalReportWidget() {
  const { data: rentals, isLoading } = useQuery({
    queryKey: ['vehicle-rentals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_rentals')
        .select(`
          *,
          vehicles (
            brand,
            model,
            license_plate
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error("Erreur lors du chargement des locations");
        throw error;
      }
      
      return data;
    }
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implementation for downloading report
    console.log("Downloading report...");
  };

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
              <FileSpreadsheet className="h-6 w-6 text-[#9b87f5]" />
              Rapport des Locations
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-white hover:bg-[#9b87f5]/20 transition-colors"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white hover:bg-[#9b87f5]/20 transition-colors"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center text-gray-400">Chargement...</div>
            ) : rentals?.map((rental) => (
              <div
                key={rental.id}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium">
                      {rental.vehicles?.brand} {rental.vehicles?.model}
                    </h3>
                    <p className="text-gray-400 text-sm">Client: {rental.client_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      Du {new Date(rental.start_date).toLocaleDateString()}
                      {rental.end_date && ` au ${new Date(rental.end_date).toLocaleDateString()}`}
                    </p>
                    {rental.cost && (
                      <p className="text-white font-medium">{rental.cost.toLocaleString()} DA</p>
                    )}
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
