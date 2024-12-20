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
  
  const formatValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    if (typeof value === 'object') return JSON.stringify(value);
    return value.toString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4">
          <Table>
            <TableBody>
              {Object.entries(data)
                .filter(([key]) => !excludedFields.includes(key))
                .map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </TableCell>
                    <TableCell>{formatValue(value)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}