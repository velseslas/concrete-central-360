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

const Suppliers = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false);

  const handleSupplierSelect = (id: string) => {
    setSelectedSupplierId(id);
  };

  const handleNewSupplier = () => {
    setShowNewSupplierForm(true);
  };

  const widgets = [
    {
      id: 'products',
      title: 'Produits',
      icon: Package,
      color: 'text-blue-400',
      component: ProductWidget
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Tag,
      color: 'text-green-400',
      component: ProductCategoryWidget
    },
    {
      id: 'purchase-orders',
      title: 'Bons de commande',
      icon: ShoppingCart,
      color: 'text-purple-400',
      component: PurchaseOrderWidget
    },
    {
      id: 'deliveries',
      title: 'Livraisons',
      icon: Truck,
      color: 'text-orange-400',
      component: DeliveryWidget
    },
    {
      id: 'payments',
      title: 'Paiements',
      icon: CreditCard,
      color: 'text-pink-400',
      component: PaymentWidget
    },
    {
      id: 'reports',
      title: 'Rapports',
      icon: Factory,
      color: 'text-indigo-400',
      component: ReportsWidget
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-gray-400',
      component: DocumentsWidget
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
          <SupplierList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SupplierDashboard />
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