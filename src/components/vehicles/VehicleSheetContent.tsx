import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, Settings } from "lucide-react";

interface VehicleItem {
  vehicle: string;
  status?: string;
  location?: string;
  issue?: string;
  since?: string;
  type?: string;
  duration?: string;
}

interface VehicleSheetContentProps {
  items: VehicleItem[];
  type: 'active' | 'maintenance' | 'broken' | 'documents';
}

export function VehicleSheetContent({ items, type }: VehicleSheetContentProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  <Car className="h-4 w-4 text-[#9b87f5]" />
                  {item.vehicle}
                </h3>
                <p className="text-gray-400 text-sm">
                  {type === 'broken' ? item.issue : 
                   type === 'maintenance' ? item.type :
                   type === 'documents' ? 'Document à renouveler' :
                   item.status}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="text-right">
                  {type === 'broken' && item.since && (
                    <p className="text-[#F97316]">Depuis le {new Date(item.since).toLocaleDateString()}</p>
                  )}
                  {type === 'maintenance' && item.duration && (
                    <p className="text-orange-400">{item.duration}</p>
                  )}
                  {type === 'active' && item.location && (
                    <p className="text-gray-300">{item.location}</p>
                  )}
                </div>
                <button className="h-8 w-8 rounded-full hover:bg-[#9b87f5]/20 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-[#9b87f5]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}