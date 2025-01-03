import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentUpload } from "@/components/shared/DocumentUpload";

interface DocumentsWidgetProps {
  clientId: number;
}

export function DocumentsWidget({ clientId }: DocumentsWidgetProps) {
  return (
    <Card className="card-dashboard">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
      </CardHeader>
      <CardContent>
        <DocumentUpload clientId={clientId} />
      </CardContent>
    </Card>
  );
}