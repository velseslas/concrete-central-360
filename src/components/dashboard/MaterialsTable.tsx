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

const StockCircle = ({ percentage, name }: { percentage: number, name: string }) => {
  const getColor = (value: number) => {
    if (value >= 70) return "#0EA5E9";
    if (value >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const color = getColor(percentage);
  const circumference = 2 * Math.PI * 30; // radius = 30
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
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
      <span className="text-sm text-gray-300 text-center">{name}</span>
    </div>
  );
};

const MaterialsTable = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {materials.map((material, index) => {
          const percentage = (material.stock / material.capacity) * 100;
          
          return (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StockCircle 
                percentage={percentage}
                name={material.name}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MaterialsTable;