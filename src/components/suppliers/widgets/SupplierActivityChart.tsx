import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', commandes: 65, livraisons: 45 },
  { month: 'Fév', commandes: 59, livraisons: 52 },
  { month: 'Mar', commandes: 80, livraisons: 70 },
  { month: 'Avr', commandes: 81, livraisons: 75 },
  { month: 'Mai', commandes: 56, livraisons: 48 },
  { month: 'Jun', commandes: 55, livraisons: 50 },
  { month: 'Jul', commandes: 40, livraisons: 35 },
];

export function SupplierActivityChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Activité des Fournisseurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="commandes" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Commandes"
              />
              <Line 
                type="monotone" 
                dataKey="livraisons" 
                stroke="#16a34a" 
                strokeWidth={2}
                name="Livraisons"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}