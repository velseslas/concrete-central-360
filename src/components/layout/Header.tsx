
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  const getPageTitle = (path: string) => {
    // Extraire le premier segment du chemin
    const mainPath = path.split('/')[1] || '';
    
    // Pour les routes avec sous-chemins, obtenir le deuxième segment
    const subPath = path.split('/')[2] || '';
    
    // Correspondance pour le chemin principal
    switch (mainPath) {
      case "":
        return "Tableau de bord";
      case "formulations":
        return "Formulations";
      case "orders":
        return "Commandes";
      case "clients":
        return "Clients";
      case "suppliers":
        return "Fournisseurs";
      case "vehicles":
        // Logique spécifique pour les sous-chemins de véhicules
        switch (subPath) {
          case "rental":
            return "Location";
          case "list":
            return "Parc roulant";
          case "maintenance":
            return "Maintenance";
          case "documents":
            return "Documents";
          default:
            return "Véhicules";
        }
      case "expenses":
        return "Dépenses";
      case "production":
        return "Production";
      case "invoices":
        return "Factures";
      case "finance":
        // Logique pour les sous-chemins de finance
        switch (subPath) {
          case "payments":
            return "Paiements";
          case "reports":
            return "Rapports";
          case "quotes":
            return "Devis";
          default:
            return "Finance";
        }
      case "payments":
        return "Paiements";
      default:
        return "Tableau de bord";
    }
  };
  
  const getPageSubtitle = (path: string) => {
    // Extraire le premier segment du chemin
    const mainPath = path.split('/')[1] || '';
    
    // Pour les routes avec sous-chemins, obtenir le deuxième segment
    const subPath = path.split('/')[2] || '';
    
    // Correspondance pour le chemin principal
    switch (mainPath) {
      case "":
        return "Gestion du tableau de bord";
      case "formulations":
        return "Gestion des formulations";
      case "orders":
        return "Gestion des commandes";
      case "clients":
        return "Gestion des clients";
      case "suppliers":
        return "Gestion des fournisseurs";
      case "vehicles":
        // Logique spécifique pour les sous-chemins de véhicules
        switch (subPath) {
          case "rental":
            return "Gestion des locations";
          case "list":
            return "Liste des véhicules";
          case "maintenance":
            return "Gestion de la maintenance";
          case "documents":
            return "Gestion des documents";
          default:
            return "Gestion des véhicules";
        }
      case "expenses":
        return "Gestion des dépenses";
      case "production":
        return "Gestion de la production";
      case "invoices":
        return "Gestion de la facturation";
      case "finance":
        // Logique pour les sous-chemins de finance
        switch (subPath) {
          case "payments":
            return "Gestion des paiements";
          case "reports":
            return "Gestion des rapports";
          case "quotes":
            return "Gestion des devis";
          default:
            return "Gestion financière";
        }
      case "payments":
        return "Gestion des paiements";
      default:
        return "Gestion du tableau de bord";
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-800/50 bg-[#111827] p-6 shadow-lg sticky top-0 z-50"
    >
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-1"
        >
          <h2 className="text-xl font-semibold text-white">
            {getPageTitle(location.pathname)}
          </h2>
          <p className="text-gray-400">
            {getPageSubtitle(location.pathname)}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6"
        >
          <button className="relative rounded-full p-2 hover:bg-gray-800/50 transition-colors duration-200">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
