import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 400000 },
  { name: 'Fév', value: 300000 },
  { name: 'Mar', value: 600000 },
  { name: 'Avr', value: 800000 },
  { name: 'Mai', value: 500000 },
  { name: 'Jun', value: 700000 },
];

const expensesData = [
  { name: 'Matériaux', value: 400000, color: '#10B981' },
  { name: 'Main d\'œuvre', value: 300000, color: '#3B82F6' },
  { name: 'Transport', value: 200000, color: '#F59E0B' },
  { name: 'Équipement', value: 150000, color: '#6366F1' },
  { name: 'Autres', value: 100000, color: '#EC4899' },
];

export function ExpenseCategoryWidget() {
  const stats = [
    {
      title: "Revenu Total",
      value: "2.4M DA",
      change: "+23%",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Dépenses",
      value: "850K DA",
      change: "+12%",
      icon: TrendingDown,
      color: "text-red-500"
    },
    {
      title: "Bénéfice Net",
      value: "1.55M DA",
      change: "+18%",
      icon: TrendingUp,
      color: "text-blue-500"
    },
    {
      title: "Trésorerie",
      value: "750K DA",
      change: "+5%",
      icon: PiggyBank,
      color: "text-yellow-500"
    }
  ];

  const total = expensesData.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow bg-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <Card className="bg-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-100 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-400" />
              Répartition des Dépenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expensesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem'
                      }}
                      formatter={(value: number) => `${value.toLocaleString()} DA`}
                    />
                    <Legend
                      formatter={(value) => <span className="text-gray-300">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}