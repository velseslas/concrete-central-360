import { useState } from "react";
import { Users, Package, CreditCard, FileText, Truck, ShoppingCart, Tag, Euro, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { ProductWidget } from "@/components/suppliers/widgets/ProductWidget";
import { PriceWidget } from "@/components/suppliers/widgets/PriceWidget";
import { ProductCategoryWidget } from "@/components/suppliers/widgets/ProductCategoryWidget";
import { DeliveryWidget } from "@/components/suppliers/widgets/DeliveryWidget";
import { DocumentsWidget } from "@/components/suppliers/widgets/DocumentsWidget";
import { ReportsWidget } from "@/components/suppliers/widgets/ReportsWidget";
import { PurchaseOrderWidget } from "@/components/suppliers/widgets/PurchaseOrderWidget";
import { PaymentWidget } from "@/components/suppliers/widgets/PaymentWidget";
import { SupplierDashboard } from "@/components/suppliers/SupplierDashboard";

const Suppliers = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  
  const widgets = [
    {
      id: 'suppliers',
      title: 'Fournisseurs',
      icon: Users,
      color: 'text-blue-400',
      component: SupplierList
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Tag,
      color: 'text-purple-400',
      component: ProductCategoryWidget
    },
    {
      id: 'products',
      title: 'Produits',
      icon: Package,
      color: 'text-emerald-400',
      component: ProductWidget
    },
    {
      id: 'prices',
      title: 'Prix',
      icon: Euro,
      color: 'text-amber-400',
      component: PriceWidget
    },
    {
      id: 'producers',
      title: 'Producteurs',
      icon: Factory,
      color: 'text-orange-400',
      component: ProductWidget
    },
    {
      id: 'purchase-orders',
      title: 'Bons de commande',
      icon: ShoppingCart,
      color: 'text-indigo-400',
      component: PurchaseOrderWidget
    },
    {
      id: 'payments',
      title: 'Paiements',
      icon: CreditCard,
      color: 'text-pink-400',
      component: PaymentWidget
    },
    {
      id: 'deliveries',
      title: 'Livraisons',
      icon: Truck,
      color: 'text-teal-400',
      component: DeliveryWidget
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-gray-400',
      component: DocumentsWidget
    }
  ];

  const handleEdit = (supplier: any) => {
    console.log("Edit supplier:", supplier);
    setSelectedSupplierId(supplier.id);
  };

  const handleDelete = (supplierId: number) => {
    console.log("Delete supplier:", supplierId);
  };

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
              <WidgetComponent 
                supplierId={selectedSupplierId}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
    >
      <div className="container mx-auto p-6 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Gestion des Fournisseurs
        </motion.h1>
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default Suppliers;