import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Material {
  name: string;
  stock: number;
  capacity: number;
  unit: string;
  lastDelivery: string;
  status: "normal" | "warning" | "critical";
}

const materials: Material[] = [
  { name: "Ciment", stock: 25000, capacity: 50000, unit: "kg", lastDelivery: "2024-03-15", status: "normal" },
  { name: "Sable 0/1", stock: 15000, capacity: 30000, unit: "kg", lastDelivery: "2024-03-14", status: "warning" },
  { name: "Sable 0/3", stock: 18000, capacity: 30000, unit: "kg", lastDelivery: "2024-03-13", status: "normal" },
  { name: "Sable 0/4", stock: 22000, capacity: 30000, unit: "kg", lastDelivery: "2024-03-12", status: "normal" },
  { name: "Gravier 3/8", stock: 12000, capacity: 25000, unit: "kg", lastDelivery: "2024-03-11", status: "critical" },
  { name: "Gravier 8/15", stock: 14000, capacity: 25000, unit: "kg", lastDelivery: "2024-03-10", status: "warning" },
  { name: "Gravier 15/25", stock: 13000, capacity: 25000, unit: "kg", lastDelivery: "2024-03-09", status: "warning" },
];

const MaterialsTable = () => {
  const getStatusBadge = (status: Material["status"]) => {
    const config = {
      normal: { class: "bg-green-100 text-green-800", text: "Normal" },
      warning: { class: "bg-yellow-100 text-yellow-800", text: "Attention" },
      critical: { class: "bg-red-100 text-red-800", text: "Critique" }
    };

    return (
      <Badge variant="outline" className={config[status].class}>
        {config[status].text}
      </Badge>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Matériau</TableHead>
            <TableHead>Stock actuel</TableHead>
            <TableHead>Capacité</TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Dernière livraison</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => {
            const percentage = (material.stock / material.capacity) * 100;
            let progressColor = "bg-green-500";
            if (percentage < 30) {
              progressColor = "bg-red-500";
            } else if (percentage < 50) {
              progressColor = "bg-yellow-500";
            }

            return (
              <TableRow key={material.name} className="hover:bg-gray-50">
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell>
                  {material.stock.toLocaleString()} {material.unit}
                </TableCell>
                <TableCell>
                  {material.capacity.toLocaleString()} {material.unit}
                </TableCell>
                <TableCell className="w-[200px]">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={percentage}
                      className={`h-2 ${progressColor}`}
                    />
                    <span className="text-sm text-gray-500">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{new Date(material.lastDelivery).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(material.status)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaterialsTable;