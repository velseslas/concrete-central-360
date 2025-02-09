
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function DocumentWidget() {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['vehicle-documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_documents')
        .select(`
          *,
          vehicles (
            brand,
            model,
            license_plate
          )
        `)
        .order('expiry_date', { ascending: true });
      
      if (error) {
        toast.error("Erreur lors du chargement des documents");
        throw error;
      }
      
      return data;
    }
  });

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
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
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#9b87f5]" />
            Documents Véhicules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center text-gray-400">Chargement...</div>
            ) : documents?.map((document) => (
              <Sheet key={document.id}>
                <SheetTrigger className="w-full">
                  <div className={`p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border transition-colors cursor-pointer text-left w-full ${
                    isExpiringSoon(document.expiry_date) 
                      ? 'border-red-500/50 hover:bg-red-900/10' 
                      : 'border-gray-700/50 hover:bg-gray-700/50'
                  }`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-white font-medium flex items-center gap-2">
                          {document.vehicles?.brand} {document.vehicles?.model}
                          {isExpiringSoon(document.expiry_date) && (
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                          )}
                        </h3>
                        <p className="text-gray-400 text-sm">{document.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Expire le</p>
                        <p className={`font-medium ${
                          isExpiringSoon(document.expiry_date) ? 'text-red-400' : 'text-white'
                        }`}>
                          {new Date(document.expiry_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Détails du document</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <p className="text-lg font-semibold">
                      {document.vehicles?.brand} {document.vehicles?.model}
                    </p>
                    <p className="text-sm text-gray-500">{document.vehicles?.license_plate}</p>
                    <div className="mt-4">
                      <p className="font-medium">Document :</p>
                      <p className="text-gray-500">{document.title}</p>
                    </div>
                    <div className="mt-4">
                      <p className="font-medium">Type :</p>
                      <p className="text-gray-500">{document.type}</p>
                    </div>
                    <div className="mt-4">
                      <p className="font-medium">Date d'expiration :</p>
                      <p className={`${isExpiringSoon(document.expiry_date) ? 'text-red-400' : 'text-gray-500'}`}>
                        {new Date(document.expiry_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
