import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { ProductionForm } from "./ProductionForm";
import { ProductionList } from "./production/ProductionList";
import { useProduction } from "./production/useProduction";
import { ProductionTimeframeWidgets } from "./production/ProductionTimeframeWidgets";
import { ReportsWidget } from "./ReportsWidget";
import { useState, useEffect } from "react";

export function ProductionWidget() {
  const [showProductionForm, setShowProductionForm] = useState(false);
  const { productions, fetchProductions } = useProduction();

  useEffect(() => {
    console.log("ProductionWidget mounted, fetching productions...");
    fetchProductions();
  }, []);

  return (
    <div className="space-y-8">
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              Productions
            </CardTitle>
            <Button
              onClick={() => setShowProductionForm(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle production
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProductionList productions={productions} />
          <ProductionTimeframeWidgets />
        </CardContent>
      </Card>

      <ReportsWidget />

      <ProductionForm
        open={showProductionForm}
        onOpenChange={(open) => {
          setShowProductionForm(open);
          if (!open) {
            fetchProductions();
          }
        }}
        onSuccess={fetchProductions}
      />
    </div>
  );
}