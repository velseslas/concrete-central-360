import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from "lucide-react";

const data = [
  {
    name: 'Chiffre d\'affaires',
    'Mois Actuel': 2400000,
    'Mois Précédent': 1800000,
  },
  {
    name: 'Dépenses',
    'Mois Actuel': 850000,
    'Mois Précédent': 750000,
  },
  {
    name: 'Bénéfice',
    'Mois Actuel': 1550000,
    'Mois Précédent': 1050000,
  },
];

export function ComparativeStatsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-gray-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Comparaison Mensuelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
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
                  formatter={(value: number) => [`${value.toLocaleString()} DA`, '']}
                />
                <Legend />
                <Bar dataKey="Mois Actuel" fill="#3B82F6" />
                <Bar dataKey="Mois Précédent" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}