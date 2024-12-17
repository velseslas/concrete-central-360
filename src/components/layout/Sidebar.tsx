import { Link, useLocation } from "react-router-dom";
import { Home, Users, TestTube, ClipboardList, Truck, Car, DollarSign, FileText, Factory, GasPump } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Tableau de bord" },
    { to: "/clients", icon: Users, label: "Clients" },
    { to: "/formulations", icon: TestTube, label: "Formulations" },
    { to: "/orders", icon: ClipboardList, label: "Commandes" },
    { to: "/production", icon: Factory, label: "Production" },
    { to: "/suppliers", icon: Truck, label: "Fournisseurs" },
    { to: "/vehicles", icon: Car, label: "Parc roulant" },
    { to: "/consumables", icon: GasPump, label: "Consommables" },
    { to: "/expenses", icon: DollarSign, label: "Dépenses" },
    { to: "/invoices", icon: FileText, label: "Factures" },
  ];

  return (
    <div className="min-h-screen w-64 border-r bg-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">Centrale à Béton</h1>
      </div>
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`sidebar-link ${location.pathname === link.to ? "active" : ""}`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;