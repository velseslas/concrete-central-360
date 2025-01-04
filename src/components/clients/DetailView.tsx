import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto !pr-0 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {title}
          </DialogTitle>
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