import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientList from "../ClientList";

export function ClientListWidget() {
  return (
    <Card className="card-dashboard">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Liste des Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientList />
      </CardContent>
    </Card>
  );
}