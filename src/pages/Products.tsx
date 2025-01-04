import { ProductManagementWidget } from "@/components/clients/widgets/ProductManagementWidget";
import { motion } from "framer-motion";

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto p-6 space-y-6"
      >
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        >
          Gestion des Produits
        </motion.h1>
        
        <ProductManagementWidget />
      </motion.div>
    </div>
  );
};

export default Products;