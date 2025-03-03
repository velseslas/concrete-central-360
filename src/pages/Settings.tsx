
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Percent, Accessibility, Factory, Database, FileText, Wrench, Languages, MapPin, LayoutGrid } from "lucide-react";
import { PlantSwitcher } from "@/components/settings/PlantSwitcher";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Settings() {
  const [selectedPlant, setSelectedPlant] = useState("Centrale 1");
  
  const settingsModules = [
    {
      title: "Paramètres entreprise",
      description: "Gérer les informations de l'entreprise",
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      path: "/settings/company"
    },
    {
      title: "TVA",
      description: "Configurer les taux de TVA",
      icon: Percent,
      color: "text-green-500",
      bgColor: "bg-green-100",
      path: "/settings/vat"
    },
    {
      title: "Accessibilité",
      description: "Options d'accessibilité de l'interface",
      icon: Accessibility,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      path: "/settings/accessibility"
    },
    {
      title: "Centrales à béton",
      description: "Gérer vos centrales à béton",
      icon: Factory,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      path: "/settings/plants"
    },
    {
      title: "Base de données",
      description: "Sauvegardes et maintenance",
      icon: Database,
      color: "text-cyan-500",
      bgColor: "bg-cyan-100",
      path: "/settings/database"
    },
    {
      title: "Modèles de documents",
      description: "Personnaliser les factures et devis",
      icon: FileText,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      path: "/settings/templates"
    },
    {
      title: "Maintenance",
      description: "Planification de maintenance",
      icon: Wrench,
      color: "text-rose-500",
      bgColor: "bg-rose-100",
      path: "/settings/maintenance"
    },
    {
      title: "Langues",
      description: "Paramètres de langue et traduction",
      icon: Languages,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
      path: "/settings/languages"
    },
    {
      title: "Emplacements",
      description: "Gérer les emplacements et zones",
      icon: MapPin,
      color: "text-teal-500",
      bgColor: "bg-teal-100",
      path: "/settings/locations"
    },
    {
      title: "Interface utilisateur",
      description: "Personnaliser l'apparence",
      icon: LayoutGrid,
      color: "text-amber-500",
      bgColor: "bg-amber-100",
      path: "/settings/ui"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative mb-10 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Paramètres</h1>
            <p className="text-gray-400 mt-2">Configurez votre application selon vos besoins</p>
          </div>
          <div className="sm:absolute sm:right-6 sm:top-1/2 sm:transform sm:-translate-y-1/2">
            <PlantSwitcher 
              selectedPlant={selectedPlant} 
              setSelectedPlant={setSelectedPlant} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {settingsModules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="h-full"
          >
            <Link to={module.path} className="block h-full">
              <SettingsCard 
                title={module.title}
                description={module.description}
                icon={module.icon}
                color={module.color}
                bgColor={module.bgColor}
                path={module.path}
                plant={selectedPlant}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

type SettingsCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  path: string;
  plant: string;
};

function SettingsCard({ title, description, icon: Icon, color, bgColor, path, plant }: SettingsCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-500 transition-all hover:shadow-lg hover:shadow-gray-900/30 cursor-pointer h-full overflow-hidden group">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className={`p-3 rounded-lg ${bgColor} transition-all duration-300 group-hover:scale-110`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
          <CardTitle className="text-lg text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400 min-h-[2.5rem]">{description}</CardDescription>
        <div className="mt-6 flex justify-end">
          <Button 
            variant="ghost" 
            className="text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-950/30 transition-colors"
          >
            Configurer
            <span className="sr-only">Configurer {title} pour {plant}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
