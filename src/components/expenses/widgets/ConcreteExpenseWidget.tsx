import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ConcreteExpenseWidget() {
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Dépenses Centrale à Béton</CardTitle>
          <Button onClick={() => setShowNewExpenseForm(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle dépense
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Table content will be implemented later */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}