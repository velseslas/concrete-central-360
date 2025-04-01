
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Supplier {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: string | null;
  notes: string | null;
}

interface SupplierListProps {
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplierId: number) => void;
}

export function SupplierList({ onEdit, onDelete }: SupplierListProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      console.log("Fetching suppliers from Supabase...");
      const { data, error } = await supabase
        .from("suppliers")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching suppliers:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger la liste des fournisseurs.",
        });
        return;
      }

      console.log("Suppliers fetched successfully:", data);
      setSuppliers(data || []);
    } catch (error) {
      console.error("Error in fetchSuppliers:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement des fournisseurs.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8">Chargement des fournisseurs...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {suppliers.map((supplier, index) => (
        <motion.div
          key={supplier.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 hover:border-[#7C3AED] transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#9b87f5]" />
              <h3 className="text-xl font-semibold text-white">{supplier.name}</h3>
            </div>
            
            <div className="space-y-2">
              {supplier.email && (
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm truncate">{supplier.email}</span>
                </div>
              )}
              
              {supplier.phone && (
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{supplier.phone}</span>
                </div>
              )}
              
              {supplier.address && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{supplier.address}</span>
                </div>
              )}
            </div>
            
            {supplier.status && (
              <div className="pt-2">
                <span className="text-sm px-2 py-1 rounded-full bg-[#1F2232] text-gray-300 inline-block">
                  {supplier.status}
                </span>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              className="w-full mt-2 bg-[#1e293b] hover:bg-[#334155] text-white"
              onClick={() => onEdit(supplier)}
            >
              Voir les détails
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
