import { Card, CardContent } from "@/components/ui/card";
import ClientList from "../ClientList";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function ClientListWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
        <CardContent className="relative z-10 p-6 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Liste des Clients</h2>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
            <ClientList />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}