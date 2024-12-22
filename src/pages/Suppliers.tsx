import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, DollarSign, FileText, Truck } from "lucide-react";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { ProductWidget } from "@/components/suppliers/widgets/ProductWidget";
import { PriceWidget } from "@/components/suppliers/widgets/PriceWidget";
import { DeliveryWidget } from "@/components/suppliers/widgets/DeliveryWidget";
import { DocumentsWidget } from "@/components/suppliers/widgets/DocumentsWidget";

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
      id: 'products',
      title: 'Produits',
      icon: Package,
      color: 'text-purple-500',
      component: ProductWidget
    },
    {
      id: 'prices',
      title: 'Prix',
      icon: DollarSign,
      color: 'text-yellow-500',
      component: PriceWidget
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-green-500',
      component: DocumentsWidget
    },
    {
      id: 'deliveries',
      title: 'Livraisons',
      icon: Truck,
      color: 'text-orange-500',
      component: DeliveryWidget
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