import { ScrollArea } from "@/components/ui/scroll-area";

interface InvoiceItem {
  id: string;
  client: string;
  amount: number;
  date: string;
  dueDate?: string;
}

interface InvoiceSheetContentProps {
  items: InvoiceItem[];
  type: 'invoice' | 'payment' | 'overdue';
}

export function InvoiceSheetContent({ items, type }: InvoiceSheetContentProps) {
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
                  {type === 'payment' ? 'Paiement' : 'Facture'} #{item.id}
                </p>
              </div>
              <p className={`text-sm font-medium ${
                type === 'overdue' ? 'text-red-400' : 
                type === 'payment' ? 'text-green-400' : 
                'text-white'
              }`}>
                {item.amount.toLocaleString()} DA
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">{type === 'overdue' ? 'Échéance' : 'Date'} :</p>
              <p className={`text-xs ${type === 'overdue' ? 'text-red-300' : 'text-gray-300'}`}>
                {new Date(type === 'overdue' ? item.dueDate! : item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}