
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
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Chargement des fournisseurs...</div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {suppliers.map((supplier, index) => (
        <motion.div
          key={supplier.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start mb-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{supplier.name}</h3>
              {supplier.status && (
                <span className="text-sm px-2 py-1 rounded-full bg-[#1F2232] text-gray-300 mt-1 inline-block">
                  {supplier.status}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
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
          
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              onClick={() => onDelete(supplier.id)}
            >
              Supprimer
            </Button>
            <Button 
              variant="ghost" 
              className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
              onClick={() => onEdit(supplier)}
            >
              Modifier
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
