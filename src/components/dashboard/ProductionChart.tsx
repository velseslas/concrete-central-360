import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Lun", production: 120, objectif: 100 },
  { date: "Mar", production: 150, objectif: 100 },
  { date: "Mer", production: 180, objectif: 100 },
  { date: "Jeu", production: 140, objectif: 100 },
  { date: "Ven", production: 160, objectif: 100 },
  { date: "Sam", production: 90, objectif: 100 },
  { date: "Dim", production: 0, objectif: 100 },
];

const ProductionChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="production" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="objectif" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8"
            fontSize={12}
          />
          <YAxis 
            stroke="#94a3b8"
            fontSize={12}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem'
            }}
          />
          <Area
            type="monotone"
            dataKey="production"
            stroke="#1E40AF"
            fillOpacity={1}
            fill="url(#production)"
            name="Production (m³)"
          />
          <Area
            type="monotone"
            dataKey="objectif"
            stroke="#EF4444"
            fillOpacity={0.3}
            fill="url(#objectif)"
            name="Objectif (m³)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionChart;