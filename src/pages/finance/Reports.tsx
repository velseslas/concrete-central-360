import { motion } from "framer-motion";
import { FileText, ChartBar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportFilters } from "@/components/finance/widgets/reports/ReportFilters";

// Mock data
const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
  { id: "3", name: "Client C" },
];

export default function Reports() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-white">Rapports Financiers</h1>
        </div>

        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBar className="h-6 w-6 text-blue-400" />
              Générer un Rapport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReportFilters clients={mockClients} />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              Rapports Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Liste des rapports récents à implémenter si nécessaire */}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
