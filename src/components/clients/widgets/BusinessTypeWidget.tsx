import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BusinessTypeList } from "./BusinessTypeList";
import { useState } from "react";
import { BusinessTypeForm } from "../BusinessTypeForm";

export function BusinessTypeWidget() {
  const [showNewBusinessTypeForm, setShowNewBusinessTypeForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Raisons sociales</CardTitle>
        <Button onClick={() => setShowNewBusinessTypeForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle raison sociale
        </Button>
      </CardHeader>
      <CardContent>
        <BusinessTypeList />
      </CardContent>

      <BusinessTypeForm 
        open={showNewBusinessTypeForm} 
        onOpenChange={setShowNewBusinessTypeForm} 
      />
    </Card>
  );
}