import { SheetTitle } from "@/components/ui/sheet";
import { LucideIcon } from "lucide-react";

interface ProductionSheetTitleProps {
  icon: LucideIcon;
  title: string;
  iconColor: string;
}

export function ProductionSheetTitle({ icon: Icon, title, iconColor }: ProductionSheetTitleProps) {
  return (
    <SheetTitle className="text-white flex items-center gap-2 text-base">
      <Icon className={`h-4 w-4 ${iconColor}`} />
      {title}
    </SheetTitle>
  );
}