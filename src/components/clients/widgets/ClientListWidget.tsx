import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientList from "../ClientList";
import { motion } from "framer-motion";

export function ClientListWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            Liste des Clients
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <ClientList />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}