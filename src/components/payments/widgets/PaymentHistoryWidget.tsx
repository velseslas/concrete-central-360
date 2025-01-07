import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";
import { motion } from "framer-motion";

const recentPayments = [
  {
    id: 1,
    type: "client",
    name: "Entreprise ABC",
    amount: 150000,
    date: "2024-03-20",
    status: "completed"
  },
  {
    id: 2,
    type: "supplier",
    name: "SARL XYZ",
    amount: 75000,
    date: "2024-03-19",
    status: "pending"
  },
  {
    id: 3,
    type: "client",
    name: "Client B",
    amount: 200000,
    date: "2024-03-18",
    status: "completed"
  }
];

export function PaymentHistoryWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <History className="h-5 w-5 text-purple-400" />
            Historique Récent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{payment.name}</p>
                    <p className="text-xs text-gray-400">
                      {payment.type === 'client' ? 'Client' : 'Fournisseur'} • {payment.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">
                      {payment.amount.toLocaleString()} DA
                    </p>
                    <p className={`text-xs ${
                      payment.status === 'completed' ? 'text-green-400' : 'text-amber-400'
                    }`}>
                      {payment.status === 'completed' ? 'Complété' : 'En attente'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}