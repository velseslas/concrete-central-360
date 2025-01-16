import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductionReportTemplate } from "./ProductionReportTemplate";
import { Production } from "../types";

interface ProductionReportPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productions: Production[];
}

export function ProductionReportPreviewDialog({
  open,
  onOpenChange,
  productions,
}: ProductionReportPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
        <ProductionReportTemplate productions={productions} />
      </DialogContent>
    </Dialog>
  );
}