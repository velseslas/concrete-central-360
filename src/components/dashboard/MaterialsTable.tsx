import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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

const StockCircle = ({ percentage }: { percentage: number }) => {
  const getColor = (value: number) => {
    if (value >= 70) return "#0EA5E9";
    if (value >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const color = getColor(percentage);
  const circumference = 2 * Math.PI * 30; // radius = 30
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-700/30"
        />
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke={color}
          strokeWidth="4"
          fill="transparent"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
      <span
        className="absolute text-sm font-medium"
        style={{ color }}
      >
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

const MaterialsTable = () => {
  const getStatusBadge = (status: Material["status"]) => {
    const config = {
      normal: { class: "bg-[#0EA5E9]/20 text-[#0EA5E9] border-[#0EA5E9]/30", text: "Normal" },
      warning: { class: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30", text: "Attention" },
      critical: { class: "bg-red-500/20 text-red-500 border-red-500/30", text: "Critique" }
    };

    return (
      <Badge variant="outline" className={config[status].class}>
        {config[status].text}
      </Badge>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700/50">
            <TableHead className="text-gray-400">Matériau</TableHead>
            <TableHead className="text-gray-400">Stock actuel</TableHead>
            <TableHead className="text-gray-400">Capacité</TableHead>
            <TableHead className="text-gray-400">Niveau</TableHead>
            <TableHead className="text-gray-400">Dernière livraison</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material, index) => {
            const percentage = (material.stock / material.capacity) * 100;

            return (
              <motion.tr
                key={material.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="hover:bg-gray-800/30 border-gray-700/50"
              >
                <TableCell className="font-medium text-gray-200">{material.name}</TableCell>
                <TableCell className="text-gray-300">
                  {material.stock.toLocaleString()} {material.unit}
                </TableCell>
                <TableCell className="text-gray-300">
                  {material.capacity.toLocaleString()} {material.unit}
                </TableCell>
                <TableCell>
                  <StockCircle percentage={percentage} />
                </TableCell>
                <TableCell className="text-gray-300">
                  {new Date(material.lastDelivery).toLocaleDateString()}
                </TableCell>
                <TableCell>{getStatusBadge(material.status)}</TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default MaterialsTable;