import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FileWarning, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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
      {mockAlerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Alert className="border-yellow-500/20 bg-yellow-500/5 text-yellow-500">
            <FileWarning className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold flex items-center gap-2">
              Document à renouveler
              <span className="text-sm font-normal px-2 py-0.5 rounded-full bg-yellow-500/20">
                {alert.documentType}
              </span>
            </AlertTitle>
            <AlertDescription className="text-gray-400">
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4" />
                Le {alert.documentType} du véhicule {alert.vehicleName} expire le{" "}
                <span className="font-medium text-yellow-500">
                  {new Date(alert.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>
      ))}
    </div>
  );
};

export default DocumentAlerts;