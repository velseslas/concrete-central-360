import { Link, useLocation } from "react-router-dom";
import { 
  Home, Users, TestTube, Truck, Car, 
  DollarSign, FileText, Factory, Package, 
  FileSpreadsheet 
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Tableau de bord" },
    { to: "/clients", icon: Users, label: "Clients" },
    { to: "/formulations", icon: TestTube, label: "Formulations" },
    { to: "/production", icon: Factory, label: "Production" },
    { to: "/suppliers", icon: Truck, label: "Fournisseurs" },
    { to: "/vehicles", icon: Car, label: "Parc roulant" },
    { to: "/expenses", icon: DollarSign, label: "Dépenses" },
    { to: "/consumables", icon: Package, label: "Consommables" },
    { to: "/invoices", icon: FileSpreadsheet, label: "Factures" },
    { to: "/orders", icon: FileText, label: "Commandes" },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="min-h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-xl p-4 border-r border-gray-800/50 shadow-xl"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">CB</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Centrale à Béton
        </h1>
      </motion.div>
      
      <nav className="space-y-1.5">
        {links.map((link, index) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                  "transition-all duration-300 group relative",
                  "hover:bg-gray-800/50 hover:backdrop-blur-xl",
                  isActive 
                    ? 'text-white bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20' 
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-300 group-hover:scale-110",
                  isActive ? 'text-purple-400' : 'text-gray-500'
                )} />
                
                <span className="transition-colors duration-300">
                  {link.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <p className="text-sm text-gray-400">
            Version 1.0.0
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;