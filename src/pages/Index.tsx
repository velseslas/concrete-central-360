import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentsWidget } from "@/components/clients/widgets/DocumentsWidget";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Tableau de bord
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentsWidget />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;