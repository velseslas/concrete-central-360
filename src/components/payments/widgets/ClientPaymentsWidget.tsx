import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function ClientPaymentsWidget() {
  const handleNewPayment = () => {
    console.log("Opening new client payment form");
    toast.info("Ouverture du formulaire de paiement client");
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
              <Users className="h-5 w-5 text-green-400" />
              Paiements Clients
            </span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleNewPayment}
              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400">Total non payé</p>
              <p className="text-lg font-bold text-white">2,345,678 DA</p>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400">Paiements en attente</p>
              <p className="text-lg font-bold text-amber-400">5</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}