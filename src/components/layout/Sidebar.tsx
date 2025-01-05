import { Link, useLocation } from "react-router-dom";
import { 
  Home, Users, TestTube, Truck, Car, 
  DollarSign, FileSpreadsheet, Factory, CreditCard, FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/", icon: Home, label: "Tableau de bord", iconColor: "text-blue-500" },
    { to: "/clients", icon: Users, label: "Clients", iconColor: "text-green-500" },
    { to: "/formulations", icon: TestTube, label: "Formulations", iconColor: "text-purple-500" },
    { to: "/production", icon: Factory, label: "Production", iconColor: "text-orange-500" },
    { to: "/suppliers", icon: Truck, label: "Fournisseurs", iconColor: "text-yellow-500" },
    { to: "/vehicles", icon: Car, label: "Parc roulant", iconColor: "text-red-500" },
    { to: "/expenses", icon: DollarSign, label: "Dépenses", iconColor: "text-emerald-500" },
    { to: "/invoices", icon: FileSpreadsheet, label: "Finance", iconColor: "text-indigo-500", 
      subItems: [
        { to: "/invoices/payments", icon: CreditCard, label: "Paiements", iconColor: "text-blue-400" },
        { to: "/invoices/billing", icon: FileText, label: "Facturation", iconColor: "text-purple-400" }
      ]
    },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="min-h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-xl p-4 border-r border-gray-800/50 shadow-xl"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group">
          <span className="text-white font-bold transition-transform group-hover:scale-110">CB</span>
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity blur" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Centrale à Béton
        </h1>
      </motion.div>
      
      <nav className="space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                  "transition-all duration-300 group relative",
                  "hover:bg-gray-800/50 hover:backdrop-blur-xl",
                  isActive 
                    ? 'text-white bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20' 
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <Icon 
                  className={item.iconColor}
                  size={20}
                />
                
                <span className="transition-colors duration-300">
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                  />
                )}
              </Link>

              {/* Sous-menus pour la section Finance */}
              {item.subItems && isActive && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subItems.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = location.pathname === subItem.to;

                    return (
                      <Link
                        key={subItem.to}
                        to={subItem.to}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
                          "transition-all duration-200",
                          isSubActive
                            ? 'text-white bg-gray-800/50'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                        )}
                      >
                        <SubIcon 
                          className={subItem.iconColor}
                          size={16}
                        />
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;