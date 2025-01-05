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
      <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#2C1A2F] border-gray-800 shadow-xl">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-gray-100 font-bold">Liste des Clients</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
            <ClientList />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}