import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, Calendar, User } from "lucide-react";

interface InvoiceDetails {
  number: string;
  date: string;
  client: string;
  amount: number;
}

const InvoiceWidget = ({ invoice }: { invoice: InvoiceDetails }) => {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-200">
          Facture #{invoice.number}
        </CardTitle>
        <FileText className="h-5 w-5 text-blue-400" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-300">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{invoice.date}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          <User className="h-4 w-4 text-gray-400" />
          <span>{invoice.client}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          <DollarSign className="h-4 w-4 text-green-400" />
          <span className="text-lg font-semibold">{invoice.amount.toLocaleString()} DA</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceWidget;