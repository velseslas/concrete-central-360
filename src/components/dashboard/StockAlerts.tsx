import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Material {
  name: string;
  stock: number;
  threshold: number;
  unit: string;
  urgency: "high" | "medium";
  daysUntilEmpty: number;
}

const materials: Material[] = [
  { name: "Ciment", stock: 25000, threshold: 30000, unit: "kg", urgency: "medium", daysUntilEmpty: 5 },
  { name: "Sable 0/1", stock: 15000, threshold: 20000, unit: "kg", urgency: "high", daysUntilEmpty: 2 },
  { name: "Gravier 3/8", stock: 12000, threshold: 15000, unit: "kg", urgency: "high", daysUntilEmpty: 3 },
];

const StockAlerts = () => {
  const lowStockMaterials = materials.filter(
    (material) => material.stock < material.threshold
  );

  if (lowStockMaterials.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        Aucune alerte de stock
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lowStockMaterials.map((material) => (
        <Alert 
          variant={material.urgency === "high" ? "destructive" : "default"}
          key={material.name}
          className="flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <AlertTitle className="mb-2">Stock faible - {material.name}</AlertTitle>
              <AlertDescription className="text-sm">
                Stock actuel: {material.stock.toLocaleString()} {material.unit}
                <br />
                Seuil minimum: {material.threshold.toLocaleString()} {material.unit}
              </AlertDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={material.urgency === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
          >
            {material.daysUntilEmpty} jours restants
          </Badge>
        </Alert>
      ))}
    </div>
  );
};

export default StockAlerts;