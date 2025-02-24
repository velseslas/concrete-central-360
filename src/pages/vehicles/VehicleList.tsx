
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const VehicleList = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4">
        <Link to="/vehicles">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux véhicules
          </Button>
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Liste des Véhicules</h1>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Rechercher un véhicule</CardTitle>
          <Search className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Rechercher par immatriculation, modèle..."
            className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="bg-gray-800/50 border-gray-700">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">V{i}</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Camion Benne #{i}</h3>
                  <p className="text-sm text-gray-400">Immatriculation: AB-{123 + i}-CD</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                  Disponible
                </span>
                <Button variant="outline" size="sm">
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
