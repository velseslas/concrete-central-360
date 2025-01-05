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
          <div key={index} className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
            <h3 className="text-base font-medium text-white">{item.vehicle}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Statut:</span> 
                <span className={`ml-2 px-2 py-0.5 rounded-full ${
                  item.status === "En mission" ? "bg-green-500/20 text-green-400" :
                  item.status === "En route" ? "bg-blue-500/20 text-blue-400" :
                  "bg-gray-500/20 text-gray-400"
                }`}>
                  {item.status}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Localisation:</span> 
                <span className="ml-2">{item.location}</span>
              </p>
            </div>
          </div>
        ));
      
      case 'maintenance':
        return items.map((item, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
            <h3 className="text-base font-medium text-white">{item.vehicle}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Type:</span> 
                <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                  {item.type}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Durée estimée:</span> 
                <span className="ml-2">{item.duration}</span>
              </p>
            </div>
          </div>
        ));
      
      case 'documents':
        return items.map((item, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
            <h3 className="text-base font-medium text-white">{item.vehicle}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Document:</span> 
                <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                  {item.document}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Date d'expiration:</span> 
                <span className="ml-2">{new Date(item.expiry).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        ));
      
      case 'broken':
        return items.map((item, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border-2 border-[#F97316] hover:bg-gray-700/50 transition-colors">
            <h3 className="text-base font-medium text-white">{item.vehicle}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Problème:</span> 
                <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                  {item.issue}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">En panne depuis:</span> 
                <span className="ml-2">{new Date(item.since).toLocaleDateString()}</span>
              </p>
            </div>
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
    <SheetContent side="right" className="w-full sm:max-w-md bg-gray-900/95 border-gray-800">
      <SheetHeader>
        <div className="flex justify-between items-center">
          <SheetTitle className="text-white">{getTitleByType()}</SheetTitle>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 p-0 hover:bg-gray-100/10"
          >
            <X className="h-4 w-4 text-indigo-500" />
          </Button>
        </div>
      </SheetHeader>
      <div className="mt-6 space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </SheetContent>
  );
};

export default VehicleSheetContent;