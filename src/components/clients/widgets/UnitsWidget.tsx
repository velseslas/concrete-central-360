import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UnitsList } from "./UnitsList";
import { useState } from "react";
import { UnitForm } from "../UnitForm";

export function UnitsWidget() {
  const [showNewUnitForm, setShowNewUnitForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Unités</CardTitle>
        <Button onClick={() => setShowNewUnitForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle unité
        </Button>
      </CardHeader>
      <CardContent>
        <UnitsList />
      </CardContent>

      <UnitForm 
        open={showNewUnitForm} 
        onOpenChange={setShowNewUnitForm} 
      />
    </Card>
  );
}