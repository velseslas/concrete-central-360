import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FileWarning } from "lucide-react";

const DocumentAlerts = () => {
  const mockAlerts = [
    {
      id: 1,
      vehicleName: "Mercedes Actros - 123 ABC 16",
      documentType: "Assurance",
      expiryDate: "2024-03-31",
    },
    {
      id: 2,
      vehicleName: "Mercedes Actros - 123 ABC 16",
      documentType: "Contrôle technique",
      expiryDate: "2024-02-28",
    },
  ];

  return (
    <div className="space-y-4">
      {mockAlerts.map((alert) => (
        <Alert key={alert.id} variant="destructive">
          <FileWarning className="h-4 w-4" />
          <AlertTitle>Document à renouveler</AlertTitle>
          <AlertDescription>
            Le {alert.documentType} du véhicule {alert.vehicleName} expire le{" "}
            {new Date(alert.expiryDate).toLocaleDateString()}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default DocumentAlerts;