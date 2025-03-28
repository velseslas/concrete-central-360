
import { useState } from "react";
import { Users, Package, CreditCard, FileText, Truck, ShoppingCart, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { ProductWidget } from "@/components/suppliers/widgets/ProductWidget";
import { DeliveryWidget } from "@/components/suppliers/widgets/DeliveryWidget";
import { DocumentsWidget } from "@/components/suppliers/widgets/DocumentsWidget";
import { PurchaseOrderWidget } from "@/components/suppliers/widgets/PurchaseOrderWidget";
import { PaymentWidget } from "@/components/suppliers/widgets/PaymentWidget";
import { ProductionWidget } from "@/components/clients/widgets/ProductionWidget";
import { SupplierDashboard, WidgetProps } from "@/components/suppliers/SupplierDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Suppliers = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleEdit = async (supplier: any) => {
    console.log("Edit supplier:", supplier);
    setSelectedSupplierId(supplier.id);
  };

  const handleDelete = async (supplierId: number) => {
    console.log("Delete supplier:", supplierId);
    try {
      const { error } = await supabase
        .from("suppliers")
        .delete()
        .eq("id", supplierId);

      if (error) {
        console.error("Error deleting supplier:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de supprimer le fournisseur.",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Le fournisseur a été supprimé avec succès.",
      });
      
      // Refresh the list by forcing a re-render
      setActiveWidget(null);
      setActiveWidget("suppliers");
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
      });
    }
  };

  const widgets: WidgetProps[] = [
    {
      id: 'products',
      title: 'Produits',
      icon: Package,
      color: 'text-blue-400',
      component: ProductWidget
    },
    {
      id: 'suppliers',
      title: 'Fournisseurs',
      icon: Users,
      color: 'text-purple-400',
      component: SupplierList
    },
    {
      id: 'purchase-orders',
      title: 'Bons de commande',
      icon: ShoppingCart,
      color: 'text-emerald-400',
      component: PurchaseOrderWidget
    },
    {
      id: 'payments',
      title: 'Paiements',
      icon: CreditCard,
      color: 'text-amber-400',
      component: PaymentWidget
    },
    {
      id: 'deliveries',
      title: 'Livraisons',
      icon: Truck,
      color: 'text-indigo-400',
      component: DeliveryWidget
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-gray-400',
      component: DocumentsWidget
    },
    {
      id: 'producer',
      title: 'Producteur',
      icon: Factory,
      color: 'text-blue-400',
      component: ProductionWidget
    }
  ];

  const renderContent = () => {
    if (activeWidget) {
      const widget = widgets.find(w => w.id === activeWidget);
      if (widget) {
        const WidgetComponent = widget.component;
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setActiveWidget(null)}
                className="text-sm text-gray-400 hover:text-gray-100 transition-colors duration-200"
              >
                ← Retour
              </button>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {widget.title}
              </h2>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 shadow-xl">
              {widget.id === 'suppliers' ? (
                <SupplierList onEdit={handleEdit} onDelete={handleDelete} />
              ) : (
                <WidgetComponent supplierId={selectedSupplierId} />
              )}
            </div>
          </motion.div>
        );
      }
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <SupplierDashboard 
          widgets={widgets}
          activeWidget={activeWidget}
          setActiveWidget={setActiveWidget}
        />
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
    >
      <div className="container mx-auto space-y-6">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default Suppliers;
