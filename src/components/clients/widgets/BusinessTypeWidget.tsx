import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BusinessTypeList } from "./BusinessTypeList";

interface BusinessTypeWidgetProps {
  onNewBusinessType: () => void;
}

export function BusinessTypeWidget({ onNewBusinessType }: BusinessTypeWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Raisons sociales</CardTitle>
        <Button onClick={onNewBusinessType} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle raison sociale
        </Button>
      </CardHeader>
      <CardContent>
        <BusinessTypeList />
      </CardContent>
    </Card>
  );
}