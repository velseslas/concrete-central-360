import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ClientActionsWidgetProps {
  onNewClient: () => void;
  onNewBusinessType: () => void;
  onNewProduct: () => void;
  onNewPrice: () => void;
}

export function ClientActionsWidget({
  onNewClient,
  onNewBusinessType,
  onNewProduct,
  onNewPrice,
}: ClientActionsWidgetProps) {
  return (
    <Card className="card-dashboard">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button onClick={onNewClient}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Client
        </Button>
        <Button variant="outline" onClick={onNewBusinessType}>
          Nouvelle raison sociale
        </Button>
        <Button variant="outline" onClick={onNewProduct}>
          Nouveau produit
        </Button>
        <Button variant="outline" onClick={onNewPrice}>
          Nouveau prix
        </Button>
      </CardContent>
    </Card>
  );
}