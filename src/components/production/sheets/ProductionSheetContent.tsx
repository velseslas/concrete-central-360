import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductionItem {
  id: string;
  client: string;
  formulation: string;
  volume: number;
  date: string;
}

interface ProductionSheetContentProps {
  items: ProductionItem[];
}

export function ProductionSheetContent({ items }: ProductionSheetContentProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <h4 className="font-medium text-sm text-white">{item.client}</h4>
                <p className="text-xs text-gray-400">
                  Production #{item.id}
                </p>
              </div>
              <p className="text-sm font-medium text-white">
                {item.volume} m³
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">Formulation :</p>
              <p className="text-xs text-gray-300">{item.formulation}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">Date :</p>
              <p className="text-xs text-gray-300">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}