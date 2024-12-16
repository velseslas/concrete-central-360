import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface Material {
  name: string;
  stock: number;
  threshold: number;
  unit: string;
}

const materials: Material[] = [
  { name: "Ciment", stock: 25000, threshold: 30000, unit: "kg" },
  { name: "Sable 0/1", stock: 15000, threshold: 20000, unit: "kg" },
  { name: "Sable 0/3", stock: 18000, threshold: 20000, unit: "kg" },
  { name: "Sable 0/4", stock: 22000, threshold: 20000, unit: "kg" },
  { name: "Gravier 3/8", stock: 12000, threshold: 15000, unit: "kg" },
  { name: "Gravier 8/15", stock: 14000, threshold: 15000, unit: "kg" },
  { name: "Gravier 15/25", stock: 13000, threshold: 15000, unit: "kg" },
];

const StockAlerts = () => {
  const lowStockMaterials = materials.filter(
    (material) => material.stock < material.threshold
  );

  if (lowStockMaterials.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {lowStockMaterials.map((material) => (
        <Alert variant="destructive" key={material.name}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Stock faible - {material.name}</AlertTitle>
          <AlertDescription>
            Stock actuel: {material.stock.toLocaleString()} {material.unit} (Seuil
            minimum: {material.threshold.toLocaleString()} {material.unit})
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default StockAlerts;