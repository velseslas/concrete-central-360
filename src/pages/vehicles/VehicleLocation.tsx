
import { motion } from "framer-motion";
import { LocationWidget } from "@/components/vehicles/widgets/LocationWidget";

const VehicleLocation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white">Localisation des Véhicules</h1>
          <LocationWidget />
        </div>
      </motion.div>
    </div>
  );
};

export default VehicleLocation;
