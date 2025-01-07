import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function BillingPaymentsWidget() {
  const payments = [
    { id: "PAY-001", client: "EURL Construction Plus", montant: "150,000 DA", date: "15/03/2024", status: "Validé" },
    { id: "PAY-002", client: "SPA Bâtiment Pro", montant: "80,000 DA", date: "14/03/2024", status: "En attente" },
    { id: "PAY-003", client: "SARL Travaux Publics", montant: "120,000 DA", date: "13/03/2024", status: "Validé" },
    { id: "PAY-004", client: "ETS Batiment", montant: "90,000 DA", date: "12/03/2024", status: "Validé" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-400" />
            Derniers Paiements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-white">{payment.client}</h4>
                      <p className="text-sm text-gray-400">Paiement #{payment.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === "Validé" 
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">{payment.date}</p>
                    <p className="text-sm font-medium text-white">{payment.montant}</p>
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