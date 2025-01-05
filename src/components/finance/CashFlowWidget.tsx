import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

const data = [
  { name: 'Jan', value: 400000 },
  { name: 'Fév', value: 300000 },
  { name: 'Mar', value: 600000 },
  { name: 'Avr', value: 800000 },
  { name: 'Mai', value: 500000 },
  { name: 'Jun', value: 700000 },
];

export function CashFlowWidget() {
  return (
    <Card className="bg-gray-800/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-100 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Flux de Trésorerie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem'
                }}
                labelStyle={{ color: '#9CA3AF' }}
                formatter={(value: number) => [`${value.toLocaleString()} DA`, 'Montant']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}