import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentTrackingChartProps {
  data: Array<{
    name: string;
    'Mois Actuel': number;
    'Mois Précédent': number;
  }>;
}

export function PaymentTrackingChart({ data }: PaymentTrackingChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
            }}
            labelStyle={{
              color: '#E5E7EB'
            }}
            formatter={(value: number, name: string) => {
              const color = name === 'Mois Actuel' ? '#0EA5E9' : '#F97316';
              return [
                <span style={{ color }}>
                  {value.toLocaleString()} DA
                </span>,
                ''
              ];
            }}
          />
          <Legend />
          <Bar dataKey="Mois Actuel" fill="#0EA5E9" />
          <Bar dataKey="Mois Précédent" fill="#F97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}