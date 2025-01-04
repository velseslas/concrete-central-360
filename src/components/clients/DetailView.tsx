import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface DetailViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Record<string, any>;
  title: string;
}

export function DetailView({ open, onOpenChange, data, title }: DetailViewProps) {
  const excludedFields = ['id'];
  
  const fieldOrder = [
    'categorieClient',
    'raisonSociale',
    'registreCommerce',
    'nom',
    'contact',
    'nif',
    'nis',
    'numeroArticle',
    'adresse',
    'ville',
    'codePostal',
    'telephone',
    'email'
  ];
  
  const formatValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    if (typeof value === 'object') return JSON.stringify(value);
    return value.toString();
  };

  const formatFieldName = (key: string) => {
    const fieldNameMap: Record<string, string> = {
      categorieClient: 'Catégorie Client',
      raisonSociale: 'Raison Sociale',
      registreCommerce: 'Registre de Commerce',
      nom: 'Nom',
      contact: 'Contact',
      nif: 'NIF',
      nis: 'NIS',
      numeroArticle: 'Article Imposition',
      adresse: 'Adresse',
      ville: 'Ville',
      codePostal: 'Code Postal',
      telephone: 'Téléphone',
      email: 'Email'
    };
    return fieldNameMap[key] || key;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; border: 1px solid #ddd; }
              th { background-color: #f5f5f5; text-align: left; }
              h1 { color: #2563eb; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <table>
              ${fieldOrder
                .filter(key => !excludedFields.includes(key) && data[key] !== undefined)
                .map(key => `
                  <tr>
                    <th>${formatFieldName(key)}</th>
                    <td>${formatValue(data[key])}</td>
                  </tr>
                `).join('')}
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-primary">
            {title}
          </DialogTitle>
          <div className="flex items-center -ml-4">
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4">
          <Table>
            <TableBody>
              {fieldOrder
                .filter(key => !excludedFields.includes(key) && data[key] !== undefined)
                .map(key => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      {formatFieldName(key)}
                    </TableCell>
                    <TableCell>{formatValue(data[key])}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
