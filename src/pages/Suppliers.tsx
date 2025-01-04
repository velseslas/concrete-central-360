import { useState } from "react";
import { Users, Package, CreditCard, FileText, Truck, ShoppingCart, Tag, Euro, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { ProductWidget } from "@/components/suppliers/widgets/ProductWidget";
import { ProductCategoryWidget } from "@/components/suppliers/widgets/ProductCategoryWidget";
import { DocumentsWidget } from "@/components/suppliers/widgets/DocumentsWidget";
import { DeliveryWidget } from "@/components/suppliers/widgets/DeliveryWidget";
import { ReportsWidget } from "@/components/suppliers/widgets/ReportsWidget";
import { PurchaseOrderWidget } from "@/components/suppliers/widgets/PurchaseOrderWidget";
import { PaymentWidget } from "@/components/suppliers/widgets/PaymentWidget";
import { SupplierDashboard } from "@/components/suppliers/SupplierDashboard";
import { toast } from "sonner";

const Suppliers = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<number>(1); // Default to first supplier
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  const handleSupplierEdit = (supplier: any) => {
    console.log("Editing supplier:", supplier);
    toast.info("Modification du fournisseur en cours...");
  };

  const handleSupplierDelete = (supplierId: number) => {
    console.log("Deleting supplier:", supplierId);
    toast.success("Fournisseur supprimé avec succès");
  };

  const widgets = [
    {
      id: 'products',
      title: 'Produits',
      icon: Package,
      color: 'text-blue-400',
      component: () => <ProductWidget supplierId={selectedSupplierId} />
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Tag,
      color: 'text-green-400',
      component: () => <ProductCategoryWidget supplierId={selectedSupplierId} />
    },
    {
      id: 'purchase-orders',
      title: 'Bons de commande',
      icon: ShoppingCart,
      color: 'text-purple-400',
      component: () => <PurchaseOrderWidget supplierId={selectedSupplierId} />
    },
    {
      id: 'deliveries',
      title: 'Livraisons',
      icon: Truck,
      color: 'text-orange-400',
      component: () => <DeliveryWidget supplierId={selectedSupplierId} />
    },
    {
      id: 'payments',
      title: 'Paiements',
      icon: CreditCard,
      color: 'text-pink-400',
      component: () => <PaymentWidget supplierId={selectedSupplierId} />
    },
    {
      id: 'reports',
      title: 'Rapports',
      icon: Factory,
      color: 'text-indigo-400',
      component: () => <ReportsWidget supplierId={selectedSupplierId} />
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-gray-400',
      component: () => <DocumentsWidget supplierId={selectedSupplierId} />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-100">Fournisseurs</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SupplierList 
            onEdit={handleSupplierEdit}
            onDelete={handleSupplierDelete}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SupplierDashboard 
            widgets={widgets}
            activeWidget={activeWidget}
            setActiveWidget={setActiveWidget}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {widget.component && <widget.component />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Suppliers;