import { Bell } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-1"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bienvenue
          </h2>
          <p className="text-gray-400">
            Gérez votre centrale à béton
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6"
        >
          <button className="relative rounded-full p-2 hover:bg-white/10 transition-colors duration-200">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-lg">
              <span className="text-sm font-medium">AB</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;