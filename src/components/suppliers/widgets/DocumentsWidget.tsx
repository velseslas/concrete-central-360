import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentUpload } from "@/components/clients/DocumentUpload";

interface DocumentsWidgetProps {
  supplierId: number;
}

export function DocumentsWidget({ supplierId }: DocumentsWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
      </CardHeader>
      <CardContent>
        <DocumentUpload clientId={supplierId} />
      </CardContent>
    </Card>
  );
}