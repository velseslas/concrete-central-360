import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface VehicleSheetContentProps {
  items: any[];
  type: 'active' | 'maintenance' | 'documents' | 'broken';
}

const VehicleSheetContent = ({ items, type }: VehicleSheetContentProps) => {
  const renderContent = () => {
    switch (type) {
      case 'active':
        return items.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-300">{item.vehicle}</h3>
            <p className="mt-1 text-sm text-gray-400">Status: {item.status}</p>
            <p className="mt-1 text-sm text-gray-400">Location: {item.location}</p>
          </div>
        ));
      
      case 'maintenance':
        return items.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-300">{item.vehicle}</h3>
            <p className="mt-1 text-sm text-gray-400">Type: {item.type}</p>
            <p className="mt-1 text-sm text-gray-400">Durée: {item.duration}</p>
          </div>
        ));
      
      case 'documents':
        return items.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-300">{item.vehicle}</h3>
            <p className="mt-1 text-sm text-gray-400">Document: {item.document}</p>
            <p className="mt-1 text-sm text-gray-400">Expiration: {item.expiry}</p>
          </div>
        ));
      
      case 'broken':
        return items.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-300">{item.vehicle}</h3>
            <p className="mt-1 text-sm text-gray-400">Problème: {item.issue}</p>
            <p className="mt-1 text-sm text-gray-400">Depuis: {item.since}</p>
          </div>
        ));
      
      default:
        return null;
    }
  };

  const getTitleByType = () => {
    switch (type) {
      case 'active':
        return 'Véhicules Actifs';
      case 'maintenance':
        return 'Véhicules en Maintenance';
      case 'documents':
        return 'Documents à Renouveler';
      case 'broken':
        return 'Véhicules en Panne';
      default:
        return 'Détails';
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <div className="flex justify-between items-center">
          <SheetTitle>{getTitleByType()}</SheetTitle>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 p-0 hover:bg-gray-100/10"
          >
            <X className="h-4 w-4 text-indigo-500" />
          </Button>
        </div>
      </SheetHeader>
      <div className="mt-6 space-y-2">
        {renderContent()}
      </div>
    </SheetContent>
  );
};

export default VehicleSheetContent;