import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { month: 'Jan', amount: 4000 },
  { month: 'Fév', amount: 3000 },
  { month: 'Mar', amount: 2000 },
  { month: 'Avr', amount: 2780 },
  { month: 'Mai', amount: 1890 },
  { month: 'Juin', amount: 2390 },
];

export function PaymentStats() {
  const totalPayments = 235000;
  const averagePayment = 47000;
  const percentageChange = 12.5;
  const isPositiveChange = percentageChange > 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="stats-card bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Paiements</CardTitle>
            <div className="stats-icon">
              <DollarSign className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="stats-value">{totalPayments.toLocaleString()} DA</div>
            <div className="flex items-center text-xs mt-2">
              {isPositiveChange ? (
                <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span className={isPositiveChange ? "text-green-400" : "text-red-400"}>
                {percentageChange}%
              </span>
              <span className="text-gray-400 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="stats-card bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Moyenne Paiements</CardTitle>
            <div className="stats-icon">
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="stats-value">{averagePayment.toLocaleString()} DA</div>
            <p className="stats-label">Par transaction</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="md:col-span-2"
      >
        <Card className="stats-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-300">Évolution des Paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}