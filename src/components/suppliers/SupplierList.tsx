import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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
    <div className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900/50 backdrop-blur-xl">
          <TableRow className="border-b border-gray-700 hover:bg-gray-800/50">
            <TableHead className="text-gray-300">Nom</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Téléphone</TableHead>
            <TableHead className="text-gray-300">Adresse</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200">
              <TableCell className="text-gray-300">{supplier.name}</TableCell>
              <TableCell className="text-gray-300">{supplier.email}</TableCell>
              <TableCell className="text-gray-300">{supplier.phone}</TableCell>
              <TableCell className="text-gray-300">{supplier.address}</TableCell>
              <TableCell className="text-gray-300">{supplier.status}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(supplier)}
                    className="hover:bg-gray-700/50"
                  >
                    <Edit className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(supplier.id)}
                    className="hover:bg-gray-700/50"
                  >
                    <Trash2 className="h-4 w-4 text-gray-300" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}