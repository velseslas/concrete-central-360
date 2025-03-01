
import { motion } from "framer-motion";
import { ArrowLeft, FileText, AlertCircle, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const documentStats = [
  {
    title: "Documents actifs",
    value: "15",
    icon: FileText,
    color: "text-blue-500"
  },
  {
    title: "À renouveler",
    value: "4",
    icon: AlertCircle,
    color: "text-yellow-500"
  },
  {
    title: "Expirés",
    value: "2",
    icon: Calendar,
    color: "text-red-500"
  },
  {
    title: "À jour",
    value: "9",
    icon: CheckCircle2,
    color: "text-green-500"
  }
];

const VehicleDocuments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link to="/vehicles">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux véhicules
          </Button>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {documentStats.map((stat) => (
          <Card key={stat.title} className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-400">documents</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Documents à renouveler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Assurance - Camion #{i}</h3>
                      <p className="text-sm text-gray-400">Expire dans {i * 5} jours</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Renouveler
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Documents récemment mis à jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Carte grise - Camion #{i}</h3>
                      <p className="text-sm text-gray-400">Mis à jour il y a {i} jours</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleDocuments;
