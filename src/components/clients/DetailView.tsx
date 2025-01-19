import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer, FileText, Package, Calendar, User, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DetailViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Record<string, any>;
  title: string;
}

export function DetailView({ open, onOpenChange, data, title }: DetailViewProps) {
  const excludedFields = ['id'];
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-400" },
      in_progress: { label: "En cours", className: "bg-blue-500/20 text-blue-400" },
      completed: { label: "Terminée", className: "bg-green-500/20 text-green-400" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatValue = (key: string, value: any) => {
    if (value === null || value === undefined) return '-';
    if (key === 'status') return getStatusBadge(value);
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    if (typeof value === 'object') return JSON.stringify(value);
    return value.toString();
  };

  const formatFieldName = (key: string) => {
    const fieldNameMap: Record<string, string> = {
      client: 'Client',
      project: 'Projet',
      formulation: 'Formulation',
      volume: 'Volume (m³)',
      status: 'Statut',
      deliveryDate: 'Date de livraison',
      category: 'Catégorie'
    };
    return fieldNameMap[key] || key;
  };

  const getIcon = (key: string) => {
    const iconMap: Record<string, any> = {
      client: User,
      project: Building2,
      formulation: FileText,
      volume: Package,
      deliveryDate: Calendar,
    };
    const IconComponent = iconMap[key];
    return IconComponent ? <IconComponent className="h-4 w-4 text-blue-400 mr-2" /> : null;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px;
                color: #1a1a1a;
              }
              .header {
                border-bottom: 2px solid #2563eb;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 20px;
              }
              th, td { 
                padding: 12px; 
                border: 1px solid #e5e7eb;
                text-align: left;
              }
              th { 
                background-color: #f3f4f6;
                font-weight: bold;
              }
              .status {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.875rem;
                display: inline-block;
              }
              .status-pending {
                background-color: #fef3c7;
                color: #d97706;
              }
              .status-in_progress {
                background-color: #dbeafe;
                color: #2563eb;
              }
              .status-completed {
                background-color: #d1fae5;
                color: #059669;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="color: #2563eb; margin: 0;">${title}</h1>
              <p style="color: #6b7280; margin: 0;">Date d'impression: ${new Date().toLocaleDateString()}</p>
            </div>
            <table>
              ${Object.entries(data)
                .filter(([key]) => !excludedFields.includes(key))
                .map(([key, value]) => {
                  let displayValue = value;
                  if (key === 'status') {
                    const statusClasses = {
                      pending: 'status-pending',
                      in_progress: 'status-in_progress',
                      completed: 'status-completed'
                    };
                    const statusLabels = {
                      pending: 'En attente',
                      in_progress: 'En cours',
                      completed: 'Terminée'
                    };
                    displayValue = `<span class="status ${statusClasses[value as keyof typeof statusClasses]}">${statusLabels[value as keyof typeof statusLabels]}</span>`;
                  }
                  return `
                    <tr>
                      <th>${formatFieldName(key)}</th>
                      <td>${displayValue}</td>
                    </tr>
                  `;
                }).join('')}
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between space-x-4">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-xl font-bold text-white">
              {title}
            </DialogTitle>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrint}
              className="bg-gray-800 hover:bg-gray-700 border-gray-700"
            >
              <Printer className="h-4 w-4 text-blue-400" />
            </Button>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            {data.id}
          </Badge>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <Table>
            <TableBody>
              {Object.entries(data)
                .filter(([key]) => !excludedFields.includes(key))
                .map(([key, value]) => (
                  <TableRow 
                    key={key}
                    className="border-gray-700 hover:bg-gray-800/50"
                  >
                    <TableCell className="font-medium text-gray-300 flex items-center">
                      {getIcon(key)}
                      {formatFieldName(key)}
                    </TableCell>
                    <TableCell className="text-white">
                      {formatValue(key, value)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}