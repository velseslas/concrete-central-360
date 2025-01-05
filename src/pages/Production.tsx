import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Package, Loader, Clock, XCircle } from "lucide-react";

interface ProductionItem {
  id: string;
  client: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  deliveryDate: string;
}

const Production = () => {
  const [productions] = useState<ProductionItem[]>([
    {
      id: "1",
      client: "Client A",
      formulation: "B25",
      volume: 30,
      status: "in_progress",
      deliveryDate: "2024-03-25",
    },
    {
      id: "2",
      client: "Client B",
      formulation: "B30",
      volume: 45,
      status: "pending",
      deliveryDate: "2024-03-26",
    },
    {
      id: "3",
      client: "Client C",
      formulation: "B25",
      volume: 25,
      status: "cancelled",
      deliveryDate: "2024-03-24",
    },
    {
      id: "4",
      client: "Client D",
      formulation: "B40",
      volume: 60,
      status: "completed",
      deliveryDate: "2024-03-24",
    },
  ]);

  const todayProductions = productions.filter(p => 
    new Date(p.deliveryDate).toDateString() === new Date().toDateString() &&
    p.status === "completed"
  );

  const inProgressProductions = productions.filter(p => p.status === "in_progress");
  const pendingProductions = productions.filter(p => p.status === "pending");
  const cancelledProductions = productions.filter(p => p.status === "cancelled");

  const ProductionWidget = ({ 
    title, 
    icon: Icon, 
    items, 
    bgColor 
  }: { 
    title: string; 
    icon: any; 
    items: ProductionItem[]; 
    bgColor: string; 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <div className={`p-2 rounded-lg ${bgColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-400 text-sm">Aucune production</p>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{item.client}</h4>
                      <p className="text-sm text-gray-400">{item.formulation} - {item.volume} m³</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        item.status === "completed" ? "bg-green-500/20 text-green-400" :
                        item.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                        item.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }
                    >
                      {item.status === "completed" ? "Terminée" :
                       item.status === "in_progress" ? "En cours" :
                       item.status === "pending" ? "En attente" :
                       "Annulée"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductionWidget 
          title="Production du Jour" 
          icon={Package} 
          items={todayProductions}
          bgColor="bg-green-500/20"
        />
        <ProductionWidget 
          title="Production en Cours" 
          icon={Loader} 
          items={inProgressProductions}
          bgColor="bg-blue-500/20"
        />
        <ProductionWidget 
          title="Production en Attente" 
          icon={Clock} 
          items={pendingProductions}
          bgColor="bg-yellow-500/20"
        />
        <ProductionWidget 
          title="Production Annulée" 
          icon={XCircle} 
          items={cancelledProductions}
          bgColor="bg-red-500/20"
        />
      </div>
    </div>
  );
};

export default Production;