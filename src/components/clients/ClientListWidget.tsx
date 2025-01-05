import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientList from "./ClientList";
import { motion } from "framer-motion";

export function ClientListWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-100">Liste des Clients</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <ClientList />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}