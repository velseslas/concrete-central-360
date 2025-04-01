
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Users, TestTube, Truck, Car, 
  DollarSign, FileSpreadsheet, Factory, Receipt, 
  Building2, Settings, LogOut, UserCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the type for sub menu items with proper component props handling
interface SubMenuItem {
  to: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: SubMenuItem[];
}

// Define the type for menu items
interface MenuItem {
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  iconColor: string;
  subItems?: SubMenuItem[];
}

export function Sidebar() {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { to: "/", icon: Home, label: "Tableau de bord", iconColor: "text-primary-300" },
    { 
      to: "/clients", 
      icon: Users, 
      label: "Clients", 
      iconColor: "text-primary-400"
    },
    { to: "/formulations", icon: TestTube, label: "Formulations", iconColor: "text-pink-400" },
    { to: "/suppliers", icon: Truck, label: "Fournisseurs", iconColor: "text-yellow-400" },
    { to: "/vehicles", icon: Car, label: "Parc roulant", iconColor: "text-red-400" },
    { to: "/expenses", icon: DollarSign, label: "Dépenses", iconColor: "text-emerald-400" },
    { 
      to: "/finance", 
      icon: Receipt, 
      label: "Finance",
      iconColor: "text-indigo-400",
    },
    { to: "/employees", icon: UserCircle, label: "Employés", iconColor: "text-amber-400" },
    { to: "/settings", icon: Settings, label: "Paramètres", iconColor: "text-teal-400" },
    { to: "/logout", icon: LogOut, label: "Quitter", iconColor: "text-red-500" },
  ];

  return (
    <div className="sticky top-0 h-screen">
      <ScrollArea className="h-full py-6 px-4 bg-[#111827] border-r border-gray-800/30">
        <div className="flex flex-col gap-6">
          <div className="px-2">
            <div className="flex items-center gap-2 px-4 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-medium text-sm">LC</span>
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-white">
                LabControl
              </h2>
            </div>
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
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all sidebar-menu-item",
                      isActive 
                        ? "bg-primary/20 text-white" 
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
                              "flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors duration-200 sidebar-menu-item",
                              location.pathname === subItem.to
                                ? "bg-primary/20 text-white"
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
                                    "block px-4 py-2 text-sm rounded-lg transition-colors duration-200 sidebar-menu-item",
                                    location.pathname === subSubItem.to
                                      ? "bg-primary/20 text-white"
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
    </div>
  );
}
