
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MapPin, Truck, RefreshCw, List, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import L from "leaflet";

// Correcting the icon path issues in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Composant auxiliaire pour réinitialiser la vue de la carte
function SetViewOnChange({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 13);
  return null;
}

// Types d'interfaces pour les données
interface Vehicle {
  id: string;
  name: string;
  type: string;
  position: [number, number]; // [latitude, longitude]
  status: "active" | "inactive" | "maintenance";
  lastUpdate: string;
}

export function LocationWidget() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("all");
  const [mapView, setMapView] = useState<"satellite" | "street">("street");
  const [mapKey, setMapKey] = useState(Date.now()); // Clé pour forcer le rechargement de la carte

  // Simuler le chargement des données de véhicules
  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      
      // Simuler une requête API
      setTimeout(() => {
        // Données factices pour la démonstration
        const mockVehicles: Vehicle[] = [
          {
            id: "1",
            name: "Camion Benne #1",
            type: "camion",
            position: [36.7525, 3.0420], // Alger
            status: "active",
            lastUpdate: "2024-03-20T14:30:00Z"
          },
          {
            id: "2",
            name: "Camion Benne #2",
            type: "camion",
            position: [36.7650, 3.0550],
            status: "active",
            lastUpdate: "2024-03-20T15:15:00Z"
          },
          {
            id: "3",
            name: "Chargeuse #1",
            type: "chargeuse",
            position: [36.7580, 3.0350],
            status: "maintenance",
            lastUpdate: "2024-03-20T13:45:00Z"
          },
          {
            id: "4",
            name: "Excavatrice #1",
            type: "excavatrice",
            position: [36.7500, 3.0480],
            status: "active",
            lastUpdate: "2024-03-20T16:00:00Z"
          },
          {
            id: "5",
            name: "Camion Benne #3",
            type: "camion",
            position: [36.7720, 3.0600],
            status: "inactive",
            lastUpdate: "2024-03-20T12:30:00Z"
          }
        ];
        
        setVehicles(mockVehicles);
        setIsLoading(false);
      }, 1500);
    };

    fetchVehicles();
  }, []);

  const refreshVehicleLocations = () => {
    setIsLoading(true);
    toast.info("Actualisation des positions en cours...");
    
    // Simuler un retard dans l'actualisation
    setTimeout(() => {
      // Actualiser les positions légèrement pour simuler un mouvement
      setVehicles(prev => 
        prev.map(vehicle => ({
          ...vehicle,
          position: [
            vehicle.position[0] + (Math.random() * 0.005 - 0.0025),
            vehicle.position[1] + (Math.random() * 0.005 - 0.0025)
          ],
          lastUpdate: new Date().toISOString()
        }))
      );
      
      setIsLoading(false);
      setMapKey(Date.now()); // Force le rechargement de la carte avec les nouvelles positions
      toast.success("Positions actualisées avec succès");
    }, 2000);
  };

  const filteredVehicles = selectedVehicleType === "all" 
    ? vehicles 
    : vehicles.filter(v => v.type === selectedVehicleType);

  // Obtenir le centre de la carte (moyenne des positions)
  const mapCenter = (() => {
    if (filteredVehicles.length === 0) return [36.7525, 3.0420] as [number, number]; // Défaut sur Alger
    
    const latSum = filteredVehicles.reduce((sum, v) => sum + v.position[0], 0);
    const lngSum = filteredVehicles.reduce((sum, v) => sum + v.position[1], 0);
    
    return [
      latSum / filteredVehicles.length,
      lngSum / filteredVehicles.length
    ] as [number, number];
  })();

  // Fonction pour formater la date/heure de dernière mise à jour
  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMarkerColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active': return "text-green-500";
      case 'maintenance': return "text-yellow-500";
      case 'inactive': return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="pb-2 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#9b87f5]" />
              Localisation Parc Roulant
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
                <SelectTrigger className="w-[180px] bg-gray-800/60 border-gray-700 text-white">
                  <SelectValue placeholder="Type de véhicule" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">Tous les véhicules</SelectItem>
                  <SelectItem value="camion">Camions</SelectItem>
                  <SelectItem value="chargeuse">Chargeuses</SelectItem>
                  <SelectItem value="excavatrice">Excavatrices</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${mapView === 'street' ? 'bg-gray-700/80 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setMapView('street')}
                  size="sm"
                >
                  <List className="h-4 w-4 mr-1" />
                  Standard
                </Button>
                
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${mapView === 'satellite' ? 'bg-gray-700/80 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setMapView('satellite')}
                  size="sm"
                >
                  <Layers className="h-4 w-4 mr-1" />
                  Satellite
                </Button>

                <Button
                  variant="outline"
                  className="bg-[#9b87f5]/20 hover:bg-[#9b87f5]/30 text-[#9b87f5] border-[#9b87f5]/30 hover:border-[#9b87f5]/40"
                  size="sm"
                  onClick={refreshVehicleLocations}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                  Actualiser
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 p-0">
          {isLoading ? (
            <div className="h-[500px] flex items-center justify-center bg-gray-800/30 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-10 w-10 text-[#9b87f5] animate-spin" />
                <p className="text-gray-300">Chargement de la carte...</p>
              </div>
            </div>
          ) : (
            <div className="relative h-[500px] w-full overflow-hidden rounded-b-lg">
              <MapContainer 
                key={mapKey}
                style={{ height: '100%', width: '100%' }}
              >
                <SetViewOnChange coords={mapCenter} />
                <ZoomControl position="topright" />
                <TileLayer
                  url={mapView === 'satellite' 
                    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  }
                />

                {filteredVehicles.map((vehicle) => (
                  <Marker 
                    key={vehicle.id} 
                    position={vehicle.position}
                  >
                    <Popup>
                      <div className="p-1 leaflet-popup-custom">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className={`h-4 w-4 ${getMarkerColor(vehicle.status)}`} />
                          <h3 className="font-medium">{vehicle.name}</h3>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600">Type: {vehicle.type}</p>
                          <p className={`${
                            vehicle.status === 'active' ? 'text-green-600' :
                            vehicle.status === 'maintenance' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            Status: {
                              vehicle.status === 'active' ? 'En service' :
                              vehicle.status === 'maintenance' ? 'En maintenance' : 'Inactif'
                            }
                          </p>
                          <p className="text-gray-600">
                            Dernière mise à jour: {formatLastUpdate(vehicle.lastUpdate)}
                          </p>
                          <p className="text-gray-600">
                            Position: {vehicle.position[0].toFixed(4)}, {vehicle.position[1].toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
