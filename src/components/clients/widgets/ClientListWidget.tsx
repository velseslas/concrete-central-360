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
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Liste des Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientList />
        </CardContent>
      </Card>
    </motion.div>
  );
}