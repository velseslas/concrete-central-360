
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, 
  ArrowDownRight, PiggyBank, Calendar, ShoppingCart 
} from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Données pour le graphique de tendance des dépenses
const trendData = [
  { month: 'Jan', amount: 125000 },
  { month: 'Fév', amount: 180000 },
  { month: 'Mar', amount: 95000 },
  { month: 'Avr', amount: 210000 },
  { month: 'Mai', amount: 170000 },
  { month: 'Juin', amount: 140000 },
  { month: 'Juil', amount: 190000 },
];

export function ExpenseSummaryWidget() {
  const stats = [
    {
      title: "Dépenses Totales",
      value: "1,250,000 DA",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      description: "depuis le dernier mois"
    },
    {
      title: "Budget Mensuel",
      value: "450,000 DA",
      change: "-5%",
      trend: "down",
      icon: PiggyBank,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      description: "économisé ce mois-ci"
    },
    {
      title: "Dépense Moyenne",
      value: "35,800 DA",
      change: "+8%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      description: "par achat"
    },
    {
      title: "Prévision Annuelle",
      value: "12.5M DA",
      change: "-3%",
      trend: "down",
      icon: Calendar,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "basé sur les tendances actuelles"
    },
  ];

  // Données pour la répartition par catégorie
  const categoryData = [
    { name: 'Parc Roulant', value: 430000, color: '#9b87f5' },
    { name: 'Centrale à Béton', value: 380000, color: '#F97316' },
    { name: 'Maintenance', value: 220000, color: '#10B981' },
    { name: 'Administratif', value: 170000, color: '#3B82F6' },
    { name: 'Autres', value: 50000, color: '#6B7280' },
  ];
  
  // Calculer le total pour les pourcentages
  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-gray-900 to-[#1A1F2C] border-[#9b87f5]/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 opacity-50" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center ${stat.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                      <span className="text-sm font-medium">{stat.change}</span>
                      {stat.trend === 'up' ? 
                        <ArrowUpRight className="h-4 w-4 ml-1" /> : 
                        <ArrowDownRight className="h-4 w-4 ml-1" />
                      }
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4 bg-gradient-to-br from-[#1A1F2C] via-gray-900 to-[#1A1F2C] border-[#9b87f5]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Tendance des Dépenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '0.375rem',
                      color: '#E5E7EB'
                    }}
                    formatter={(value: number) => [`${value.toLocaleString()} DA`, 'Montant']}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#9b87f5" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-gradient-to-br from-[#1A1F2C] via-gray-900 to-[#1A1F2C] border-[#9b87f5]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ListFilter className="h-5 w-5 text-yellow-400" />
              Répartition par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{category.name}</span>
                    <span className="text-sm text-gray-300">
                      {((category.value / total) * 100).toFixed(1)}% 
                      <span className="text-gray-500 ml-1">
                        ({category.value.toLocaleString()} DA)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(category.value / total) * 100}%`, 
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-[#1A1F2C] via-gray-900 to-[#1A1F2C] border-[#9b87f5]/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-400" />
            Dépenses Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <ShoppingCart className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Achat de matériaux</p>
                    <p className="text-gray-400 text-sm">Fournisseur ABC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">85,000 DA</p>
                  <p className="text-gray-400 text-sm">Il y a 2 jours</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { ListFilter } from "lucide-react";
