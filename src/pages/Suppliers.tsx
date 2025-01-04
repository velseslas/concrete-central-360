import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, CreditCard, FileText, Truck, ShoppingCart, Tag, Euro, Factory } from "lucide-react";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { ProductWidget } from "@/components/suppliers/widgets/ProductWidget";
import { PriceWidget } from "@/components/suppliers/widgets/PriceWidget";
import { ProductCategoryWidget } from "@/components/suppliers/widgets/ProductCategoryWidget";
import { DeliveryWidget } from "@/components/suppliers/widgets/DeliveryWidget";
import { DocumentsWidget } from "@/components/suppliers/widgets/DocumentsWidget";
import { ReportsWidget } from "@/components/suppliers/widgets/ReportsWidget";
import { PurchaseOrderWidget } from "@/components/suppliers/widgets/PurchaseOrderWidget";
import { PaymentWidget } from "@/components/suppliers/widgets/PaymentWidget";
import { StatsCards } from "@/components/suppliers/widgets/StatsCards";
import { SupplierActivityChart } from "@/components/suppliers/widgets/SupplierActivityChart";

const Suppliers = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  
  const widgets = [
    {
      id: 'suppliers',
      title: 'Fournisseurs',
      icon: Users,
      color: 'text-blue-500',
      component: SupplierList
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Tag,
      color: 'text-purple-500',
      component: ProductCategoryWidget
    },
    {
      id: 'products',
      title: 'Produits',
      icon: Package,
      color: 'text-green-500',
      component: ProductWidget
    },
    {
      id: 'prices',
      title: 'Prix',
      icon: Euro,
      color: 'text-yellow-500',
      component: PriceWidget
    },
    {
      id: 'producers',
      title: 'Producteurs',
      icon: Factory,
      color: 'text-orange-500',
      component: ProductWidget
    },
    {
      id: 'purchase-orders',
      title: 'Bons de commande',
      icon: ShoppingCart,
      color: 'text-indigo-500',
      component: PurchaseOrderWidget
    },
    {
      id: 'payments',
      title: 'Paiements',
      icon: CreditCard,
      color: 'text-pink-500',
      component: PaymentWidget
    },
    {
      id: 'deliveries',
      title: 'Livraisons',
      icon: Truck,
      color: 'text-teal-500',
      component: DeliveryWidget
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-gray-500',
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
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveWidget(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Retour
              </button>
              <h2 className="text-2xl font-bold">{widget.title}</h2>
            </div>
            <WidgetComponent 
              supplierId={selectedSupplierId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );
      }
    }

    return (
      <div className="space-y-6">
        <StatsCards />
        <SupplierActivityChart />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => {
            const IconComponent = widget.icon;
            return (
              <Card 
                key={widget.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveWidget(widget.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className={`h-6 w-6 ${widget.color}`} />
                    {widget.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gérer les {widget.title.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestion des Fournisseurs</h1>
      {renderContent()}
    </div>
  );
};

export default Suppliers;