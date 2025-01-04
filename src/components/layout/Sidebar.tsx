import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Package,
  ShoppingCart,
  Settings,
  Building2,
  FileText,
  DollarSign,
  CreditCard,
  TrendingUp
} from "lucide-react";

export function Sidebar() {
  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/',
      color: "text-sky-500"
    },
    {
      label: 'Clients',
      icon: Users,
      href: '/clients',
      color: "text-violet-500",
    },
    {
      label: 'Produits',
      icon: Package,
      href: '/products',
      color: "text-pink-500",
    },
    {
      label: 'Commandes',
      icon: ShoppingCart,
      href: '/orders',
      color: "text-orange-500",
    },
    {
      label: 'Fournisseurs',
      icon: Building2,
      href: '/suppliers',
      color: "text-yellow-500",
    },
    {
      label: 'Documents',
      icon: FileText,
      href: '/documents',
      color: "text-green-500",
    },
    {
      label: 'Finances',
      icon: DollarSign,
      href: '/finances',
      color: "text-emerald-500",
    },
    {
      label: 'Paiements',
      icon: CreditCard,
      href: '/payments',
      color: "text-blue-500",
    },
    {
      label: 'Rapports',
      icon: TrendingUp,
      href: '/reports',
      color: "text-indigo-500",
    },
    {
      label: 'Paramètres',
      icon: Settings,
      href: '/settings',
      color: "text-gray-500",
    }
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  isActive ? "text-white bg-white/10" : "text-zinc-400",
                )
              }
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}