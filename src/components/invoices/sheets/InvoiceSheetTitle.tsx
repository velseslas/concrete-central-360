import { SheetTitle } from "@/components/ui/sheet";
import { LucideIcon } from "lucide-react";

interface InvoiceSheetTitleProps {
  icon: LucideIcon;
  title: string;
  iconColor: string;
}

export function InvoiceSheetTitle({ icon: Icon, title, iconColor }: InvoiceSheetTitleProps) {
  return (
    <SheetTitle className="text-white flex items-center gap-2 text-base">
      <Icon className={`h-4 w-4 ${iconColor}`} />
      {title}
    </SheetTitle>
  );
}