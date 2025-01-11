import { Link, useLocation } from "react-router-dom";
import { 
  Home, Users, TestTube, Truck, Car, 
  DollarSign, FileSpreadsheet, Factory, Receipt, 
  CreditCard, Building2, Calculator
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { to: "/", icon: Home, label: "Tableau de bord", iconColor: "text-blue-500" },
    { to: "/clients", icon: Users, label: "Clients", iconColor: "text-purple-500" },
    { to: "/formulations", icon: TestTube, label: "Formulations", iconColor: "text-pink-500" },
    { to: "/suppliers", icon: Truck, label: "Fournisseurs", iconColor: "text-yellow-500" },
    { to: "/vehicles", icon: Car, label: "Parc roulant", iconColor: "text-red-500" },
    { to: "/expenses", icon: DollarSign, label: "Dépenses", iconColor: "text-emerald-500" },
    { 
      to: "/finance", 
      icon: Receipt, 
      label: "Finance",
      iconColor: "text-indigo-500",
      subItems: [
        { 
          to: "/finance/payments", 
          label: "Paiements", 
          icon: CreditCard,
          subItems: [
            { to: "/finance/payments/clients", label: "Clients" },
            { to: "/finance/payments/suppliers", label: "Fournisseurs" }
          ]
        },
        {
          to: "/finance/quotes",
          label: "Devis",
          icon: Calculator
        }
      ]
    },
  ];

  return (
    <ScrollArea className="h-screen py-6 px-4 bg-gray-900">
      <div className="flex flex-col gap-6">
        <div className="px-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white">
            Menu Principal
          </h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || 
                            (item.subItems?.some(sub => 
                              location.pathname === sub.to || 
                              sub.subItems?.some(subsub => location.pathname === subsub.to)
                            ));
            
            return (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col"
              >
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    isActive 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", item.iconColor)} />
                  <span>{item.label}</span>
                  {item.subItems && (
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-auto h-4 w-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </motion.div>
                  )}
                </Link>

                {item.subItems && isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-6 mt-1 space-y-1"
                  >
                    {item.subItems.map((subItem) => (
                      <div key={subItem.to} className="flex flex-col">
                        <Link
                          to={subItem.to}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors duration-200",
                            location.pathname === subItem.to
                              ? "text-white bg-gray-800/50"
                              : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                          )}
                        >
                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                          {subItem.label}
                        </Link>

                        {subItem.subItems && location.pathname.startsWith(subItem.to) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-6 mt-1 space-y-1"
                          >
                            {subItem.subItems.map((subSubItem) => (
                              <Link
                                key={subSubItem.to}
                                to={subSubItem.to}
                                className={cn(
                                  "block px-4 py-2 text-sm rounded-lg transition-colors duration-200",
                                  location.pathname === subSubItem.to
                                    ? "text-white bg-gray-800/50"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                                )}
                              >
                                {subSubItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </nav>
      </div>
    </ScrollArea>
  );
}
