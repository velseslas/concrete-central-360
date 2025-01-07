import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Invoice } from "@/types/invoice";

interface InvoiceDetailsProps {
  invoice: Invoice | null;
  onStatusChange: (status: Invoice["status"]) => void;
}

export function InvoiceDetails({ invoice, onStatusChange }: InvoiceDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-gray-400">Client</p>
        <p className="text-white font-medium">{invoice?.client}</p>
      </div>
      <div>
        <p className="text-gray-400">Montant</p>
        <p className="text-white font-medium">{invoice?.amount}</p>
      </div>
      <div>
        <p className="text-gray-400">Date</p>
        <p className="text-white font-medium">{invoice?.date}</p>
      </div>
      <div>
        <p className="text-gray-400">Statut</p>
        <Select value={invoice?.status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full bg-gray-800 border-gray-700">
            <SelectValue placeholder="Changer le statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="paid">Payée</SelectItem>
            <SelectItem value="overdue">En retard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}