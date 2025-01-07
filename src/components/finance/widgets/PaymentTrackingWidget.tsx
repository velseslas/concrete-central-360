import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CreditCard, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { PaymentForm } from "@/components/clients/PaymentForm";
import { PaymentStateDetailsDialog } from "@/components/clients/payment-form/PaymentStateDetailsDialog";
import { toast } from "sonner";

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

const mockPayments = [
  {
    id: 1,
    date: "2024-03-20",
    reference: "PAY001",
    amount: 150000,
    method: "especes",
    clientName: "Client A",
    projectName: "Projet 1"
  },
  {
    id: 2,
    date: "2024-03-21",
    reference: "PAY002",
    amount: 200000,
    method: "cheque",
    clientName: "Client B",
    projectName: "Projet 2"
  },
  {
    id: 3,
    date: "2024-03-22",
    reference: "PAY003",
    amount: 300000,
    method: "virement",
    clientName: "Client A",
    projectName: "Projet 3"
  }
];

export function PaymentTrackingWidget() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const handleNewPayment = () => {
    console.log("Opening payment form");
    setShowPaymentForm(true);
  };

  const handleViewDetails = () => {
    console.log("Opening payment details");
    setShowPaymentDetails(true);
  };

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
            <Button 
              onClick={handleNewPayment}
              variant="outline"
              className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors relative z-10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Paiement
            </Button>
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

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Derniers Paiements</h3>
              <Button 
                variant="outline" 
                onClick={handleViewDetails}
                size="sm"
                className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Voir les détails
              </Button>
            </div>

            <div className="space-y-2">
              {mockPayments.slice(0, 3).map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all cursor-pointer group relative"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {payment.clientName} - {payment.projectName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {payment.date} - Réf: {payment.reference}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-blue-400">
                      {payment.amount.toLocaleString()} DA
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {showPaymentForm && (
        <PaymentForm 
          open={showPaymentForm} 
          onOpenChange={setShowPaymentForm}
          clientId={1}
        />
      )}

      {showPaymentDetails && (
        <PaymentStateDetailsDialog
          open={showPaymentDetails}
          onOpenChange={setShowPaymentDetails}
          payments={mockPayments}
          filters={{
            periodType: "month",
            startDate: "",
            endDate: "",
            client: "all",
            method: "all"
          }}
        />
      )}
    </motion.div>
  );
}