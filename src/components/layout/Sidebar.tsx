import { Link, useLocation } from "react-router-dom";
import { Home, Users, TestTube, Truck, Car, DollarSign, FileText, Factory } from "lucide-react";
import { motion } from "framer-motion";

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
    { to: "/invoices", icon: FileText, label: "Factures" },
  ];

  return (
    <div className="min-h-screen w-64 bg-gray-900/95 backdrop-blur-xl p-4 border-r border-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Centrale à Béton
        </h1>
      </motion.div>
      
      <nav className="space-y-2">
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
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-300 group relative
                  ${isActive 
                    ? 'text-white bg-gray-800/50 border border-gray-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'}
                `}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-blue-400' : 'text-gray-500'
                }`} />
                
                <span className="transition-colors duration-300">
                  {link.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-400"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;