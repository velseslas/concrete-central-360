import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Calendar, CalendarDays } from "lucide-react";
import { OrderForm } from "@/components/orders/OrderForm";
import { DetailView } from "@/components/clients/DetailView";
import { motion } from "framer-motion";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { fr } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
  delivery_date: string;
  client: string;
  project: string;
}

interface OrderTimeframeWidgetProps {
  timeframe: "day" | "week" | "month" | "year";
  clientId?: number;
}

export function OrderTimeframeWidget({ timeframe, clientId }: OrderTimeframeWidgetProps) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTimeframeTitle = () => {
    switch (timeframe) {
      case "day":
        return "Commandes du jour";
      case "week":
        return "Commandes de la semaine";
      case "month":
        return "Commandes du mois";
      case "year":
        return "Commandes de l'année";
    }
  };

  const getTimeframeIcon = () => {
    switch (timeframe) {
      case "day":
        return Calendar;
      case "week":
      case "month":
      case "year":
        return CalendarDays;
    }
  };

  const getTimeframeDates = () => {
    const now = new Date();
    switch (timeframe) {
      case "day":
        return {
          start: startOfDay(now),
          end: endOfDay(now),
          label: format(now, "d MMMM yyyy", { locale: fr })
        };
      case "week":
        return {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 }),
          label: `Semaine du ${format(startOfWeek(now, { weekStartsOn: 1 }), "d MMMM", { locale: fr })}`
        };
      case "month":
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
          label: format(now, "MMMM yyyy", { locale: fr })
        };
      case "year":
        return {
          start: startOfYear(now),
          end: endOfYear(now),
          label: format(now, "yyyy", { locale: fr })
        };
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-400" },
      in_progress: { label: "En cours", className: "bg-blue-500/20 text-blue-400" },
      completed: { label: "Terminée", className: "bg-green-500/20 text-green-400" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { start, end } = getTimeframeDates();
      
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString())
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Transform the data to ensure status is of the correct type
      const transformedData = (data || []).map(order => ({
        ...order,
        status: (order.status || "pending") as Order["status"]
      }));
      
      setOrders(transformedData);
    } catch (error) {
      console.error(`Error fetching ${timeframe} orders:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClick = (order: Order) => {
    console.log(`${timeframe} order clicked:`, order);
    setSelectedOrder(order);
  };

  const handleNewOrder = () => {
    console.log(`Attempting to open order form for ${timeframe}`);
    setShowOrderForm(true);
  };

  const handleSubmit = async (data: any) => {
    console.log(`New ${timeframe} order:`, data);
    setShowOrderForm(false);
    await fetchOrders(); // Refresh the list
  };

  const IconComponent = getTimeframeIcon();
  const { label } = getTimeframeDates();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <IconComponent className="h-6 w-6 text-blue-400" />
              {getTimeframeTitle()}
              <span className="text-sm font-normal text-gray-400">({label})</span>
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher une commande..." 
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                />
              </div>
              <Button 
                onClick={handleNewOrder}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle commande
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleOrderClick(order)}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      {order.id}
                    </h3>
                    <p className="text-gray-400 text-sm">{order.client} - {order.project}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-medium">{order.formulation}</p>
                      <p className="text-gray-400 text-sm">{order.delivery_date}</p>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <OrderForm
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        onSubmit={handleSubmit}
      />

      {selectedOrder && (
        <DetailView
          open={!!selectedOrder}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
          data={selectedOrder}
          title={`Détails de la commande ${selectedOrder.id}`}
        />
      )}
    </motion.div>
  );
}