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
    <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-white text-base">{item.client}</h4>
                <p className="text-sm text-gray-400">
                  {type === 'payment' ? 'Paiement' : 'Facture'} #{item.id}
                </p>
              </div>
              <p className={`text-base font-bold ${
                type === 'overdue' ? 'text-red-400' : 
                type === 'payment' ? 'text-green-400' : 
                'text-white'
              }`}>
                {item.amount.toLocaleString()} DA
              </p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-400">{type === 'overdue' ? 'Échéance' : 'Date'} :</p>
              <p className={`text-gray-300 ${type === 'overdue' ? 'text-red-300' : ''}`}>
                {new Date(type === 'overdue' ? item.dueDate! : item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}