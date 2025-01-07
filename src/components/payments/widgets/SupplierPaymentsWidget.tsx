import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function SupplierPaymentsWidget() {
  const handleNewPayment = () => {
    console.log("Opening new supplier payment form");
    toast.info("Ouverture du formulaire de paiement fournisseur");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-400" />
              Paiements Fournisseurs
            </span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleNewPayment}
              className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 border-purple-500/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400">Total à payer</p>
              <p className="text-lg font-bold text-white">1,234,567 DA</p>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400">Échéances proches</p>
              <p className="text-lg font-bold text-red-400">3</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}