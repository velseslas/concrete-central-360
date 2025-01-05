import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Car, Settings, Calendar, DollarSign, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

export function RollingStockExpenseWidget() {
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);

  // Mock data for demonstration
  const expenses = [
    {
      id: 1,
      date: "2024-03-15",
      vehicle: "Mercedes Actros - 123 ABC 16",
      type: "Carburant",
      amount: 1500,
    },
    {
      id: 2,
      date: "2024-03-14",
      vehicle: "Volvo FH - 456 DEF 16",
      type: "Entretien",
      amount: 2500,
    },
  ];

  const brokenVehicles = [
    {
      vehicle: "Scania R500",
      issue: "Problème de transmission",
      since: "2024-03-15"
    },
    {
      vehicle: "MAN TGX",
      issue: "Panne moteur",
      since: "2024-03-18"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="py-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2 text-xl font-bold">
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2">
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-green-400" />
                Total dépenses
              </h3>
              <p className="text-base font-bold text-white">45,000 DH</p>
              <p className="text-sm text-gray-400">15 dépenses au total</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-yellow-400" />
                Dépenses du mois
              </h3>
              <p className="text-base font-bold text-white">15,000 DH</p>
              <p className="text-sm text-gray-400">5 dépenses ce mois</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-[#9b87f5]" />
                Véhicules actifs
              </h3>
              <p className="text-base font-bold text-white">12</p>
              <p className="text-sm text-gray-400">En service</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border-2 border-[#F97316] min-w-[160px] flex-1">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-[#F97316]" />
                Véhicules en panne
              </h3>
              <p className="text-base font-bold text-[#F97316]">{brokenVehicles.length}</p>
              <p className="text-sm text-gray-400">Nécessitent une intervention</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            {brokenVehicles.map((vehicle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border-2 border-[#F97316] hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-[#F97316]" />
                      {vehicle.vehicle}
                    </h3>
                    <p className="text-[#F97316] text-sm">{vehicle.issue}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">En panne depuis:</p>
                      <p className="text-white font-medium">
                        {new Date(vehicle.since).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-[#F97316]/20"
                    >
                      <Settings className="h-4 w-4 text-[#F97316]" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {expenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#9b87f5]" />
                      {expense.vehicle}
                    </h3>
                    <p className="text-gray-400 text-sm">{expense.type}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {expense.amount.toLocaleString()} DH
                      </p>
                      <p className="text-gray-400 text-sm">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-[#9b87f5]/20"
                    >
                      <Settings className="h-4 w-4 text-[#9b87f5]" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}