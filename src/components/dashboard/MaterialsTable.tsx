import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface Material {
  name: string;
  stock: number;
  capacity: number;
  unit: string;
}

const materials: Material[] = [
  { name: "Ciment", stock: 25000, capacity: 50000, unit: "kg" },
  { name: "Sable 0/1", stock: 15000, capacity: 30000, unit: "kg" },
  { name: "Sable 0/3", stock: 18000, capacity: 30000, unit: "kg" },
  { name: "Sable 0/4", stock: 22000, capacity: 30000, unit: "kg" },
  { name: "Gravier 3/8", stock: 12000, capacity: 25000, unit: "kg" },
  { name: "Gravier 8/15", stock: 14000, capacity: 25000, unit: "kg" },
  { name: "Gravier 15/25", stock: 13000, capacity: 25000, unit: "kg" },
];

const MaterialsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matériau</TableHead>
          <TableHead>Stock actuel</TableHead>
          <TableHead>Capacité</TableHead>
          <TableHead>Niveau</TableHead>
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
            <TableRow key={material.name}>
              <TableCell className="font-medium">{material.name}</TableCell>
              <TableCell>
                {material.stock.toLocaleString()} {material.unit}
              </TableCell>
              <TableCell>
                {material.capacity.toLocaleString()} {material.unit}
              </TableCell>
              <TableCell className="w-[200px]">
                <Progress
                  value={percentage}
                  className={`h-2 ${progressColor}`}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default MaterialsTable;