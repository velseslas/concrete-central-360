import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Production } from "./types";

export function useProduction() {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProductions = async () => {
    console.log("Fetching productions...");
    const { data, error } = await supabase
      .from("productions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching productions:", error);
      toast.error("Erreur lors du chargement des productions");
      return;
    }

    console.log("Productions fetched:", data);
    const typedData = data?.map(prod => ({
      ...prod,
      status: (prod.status || "pending") as "pending" | "in_progress" | "completed"
    })) || [];

    setProductions(typedData);
  };

  const fetchOrders = async () => {
    console.log("Fetching orders...");
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "pending");

    if (error) {
      console.error("Error fetching orders:", error);
      toast.error("Erreur lors du chargement des commandes");
      return [];
    }

    console.log("Orders fetched:", data);
    return data || [];
  };

  return {
    productions,
    loading,
    setLoading,
    fetchProductions,
    fetchOrders
  };
}