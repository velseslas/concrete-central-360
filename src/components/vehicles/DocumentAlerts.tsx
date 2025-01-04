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
      <h2 className="text-xl font-semibold text-[#D6BCFA] mb-4">Documents à renouveler</h2>
      {mockAlerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Alert className="border-[#9b87f5]/20 bg-[#2A2F3C] text-[#9b87f5]">
            <FileWarning className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold flex items-center gap-2">
              {alert.documentType}
              <span className="text-sm font-normal px-2 py-0.5 rounded-full bg-[#9b87f5]/20">
                À renouveler
              </span>
            </AlertTitle>
            <AlertDescription className="text-[#7E69AB]">
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {alert.vehicleName} - Expire le{" "}
                  <span className="font-medium text-[#9b87f5]">
                    {new Date(alert.expiryDate).toLocaleDateString()}
                  </span>
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