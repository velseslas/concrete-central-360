import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingDown } from "lucide-react";

const expensesData = [
  { name: 'Matériaux', value: 400000, color: '#10B981' },
  { name: 'Main d\'œuvre', value: 300000, color: '#3B82F6' },
  { name: 'Transport', value: 200000, color: '#F59E0B' },
  { name: 'Équipement', value: 150000, color: '#6366F1' },
  { name: 'Autres', value: 100000, color: '#EC4899' },
];

export function ExpensesWidget() {
  const total = expensesData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-gray-800/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-100 flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-400" />
          Répartition des Dépenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    borderRadius: '0.375rem',
                    color: '#D6BCFA'  // Couleur du texte (Light Purple)
                  }}
                  formatter={(value: number) => (
                    <span style={{ color: '#D6BCFA' }}>{value.toLocaleString()} DA</span>
                  )}
                />
                <Legend
                  formatter={(value) => <span className="text-gray-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-purple-300">Catégorie</TableHead>
                <TableHead className="text-right text-purple-300">Montant</TableHead>
                <TableHead className="text-right text-purple-300">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expensesData.map((item) => (
                <TableRow key={item.name} className="border-gray-700">
                  <TableCell className="text-purple-300">{item.name}</TableCell>
                  <TableCell className="text-right text-purple-300">
                    {item.value.toLocaleString()} DA
                  </TableCell>
                  <TableCell className="text-right text-purple-300">
                    {((item.value / total) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}