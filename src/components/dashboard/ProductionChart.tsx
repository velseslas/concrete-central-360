import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Lun", production: 120 },
  { date: "Mar", production: 150 },
  { date: "Mer", production: 180 },
  { date: "Jeu", production: 140 },
  { date: "Ven", production: 160 },
  { date: "Sam", production: 90 },
  { date: "Dim", production: 0 },
];

const ProductionChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="production" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="production"
            stroke="#1E40AF"
            fillOpacity={1}
            fill="url(#production)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionChart;