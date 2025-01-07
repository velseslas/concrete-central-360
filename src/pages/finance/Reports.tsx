import { motion } from "framer-motion";

export default function Reports() {
  return (
    <div className="container mx-auto p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-8"
      >
        Rapports Financiers
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contenu des rapports à venir */}
      </div>
    </div>
  );
}