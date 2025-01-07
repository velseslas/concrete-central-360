import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    'Mois Actuel': 4000,
    'Mois Précédent': 2400,
  },
  {
    name: 'Fév',
    'Mois Actuel': 3000,
    'Mois Précédent': 1398,
  },
  {
    name: 'Mar',
    'Mois Actuel': 2000,
    'Mois Précédent': 9800,
  },
  {
    name: 'Avr',
    'Mois Actuel': 2780,
    'Mois Précédent': 3908,
  },
  {
    name: 'Mai',
    'Mois Actuel': 1890,
    'Mois Précédent': 4800,
  },
  {
    name: 'Juin',
    'Mois Actuel': 2390,
    'Mois Précédent': 3800,
  },
];

export function PaymentTrackingWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-blue-400" />
              État des Paiements
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
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
                <Bar dataKey="Mois Actuel" fill="#0EA5E9" /> {/* Ocean Blue */}
                <Bar dataKey="Mois Précédent" fill="#F97316" /> {/* Bright Orange */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}