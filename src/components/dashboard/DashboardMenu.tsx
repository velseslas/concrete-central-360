import {
  Calculator,
  Calendar,
  Settings,
  Bell,
  Search,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toast } from "sonner";

const menuItems = [
  { icon: Calculator, label: "Calculateur", action: () => toast.info("Calculateur ouvert") },
  { icon: Calendar, label: "Planning", action: () => toast.info("Planning ouvert") },
  { icon: Settings, label: "Paramètres", action: () => toast.info("Paramètres ouverts") },
  { icon: Bell, label: "Notifications", action: () => toast.info("Notifications ouvertes") },
  { icon: Search, label: "Rechercher", action: () => toast.info("Recherche ouverte") },
  { icon: Download, label: "Exporter", action: () => toast.info("Export en cours") },
  { icon: Upload, label: "Importer", action: () => toast.info("Import en cours") },
  { icon: RefreshCw, label: "Actualiser", action: () => toast.info("Actualisation en cours") },
];

export function DashboardMenu() {
  return (
    <div className="flex items-center gap-2">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-12 w-12 rounded-xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
              >
                <item.icon className="h-5 w-5 text-gray-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-gray-800/90 backdrop-blur-lg border border-gray-700"
            >
              <DropdownMenuItem
                onClick={item.action}
                className="text-gray-300 focus:text-white focus:bg-gray-700/50"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      ))}
    </div>
  );
}