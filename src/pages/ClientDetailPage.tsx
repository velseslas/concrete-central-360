
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Building, User, Mail, Phone, MapPin, Edit, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductPriceForm } from "@/components/clients/ProductPriceForm";
import { ProjectListSection } from "@/components/clients/widgets/ProjectListSection";

// Mock data for client
const getClientById = (id: number) => {
  const mockClients = [
    {
      id: 1,
      nom: "Constructions Modernes",
      raisonSociale: "SARL Constructions Modernes",
      contactName: "Jean Dupont",
      email: "j.dupont@construmod.fr",
      telephone: "01 23 45 67 89",
      ville: "Alger",
      region: "Centre",
      adresse: "123 Boulevard Central",
      codePostal: "16000",
      projectCount: 5
    },
    {
      id: 2,
      nom: "SPA Promotech",
      raisonSociale: "SPA Promotech",
      contactName: "Karim Hadj",
      email: "info@promotech.dz",
      telephone: "023-56-78-90",
      ville: "Oran",
      region: "Ouest",
      adresse: "45 Rue des Palmiers",
      codePostal: "31000",
      projectCount: 2
    },
    {
      id: 3,
      nom: "EURL Architectura",
      raisonSociale: "EURL Architectura",
      contactName: "Leila Mansouri",
      email: "contact@architectura.dz",
      telephone: "025-78-90-12",
      ville: "Constantine",
      region: "Est",
      adresse: "78 Avenue des Frères Abbas",
      codePostal: "25000",
      projectCount: 1
    }
  ];
  
  return mockClients.find(client => client.id === id);
};

// Mock projects data
const mockProjects = [
  {
    id: 1,
    name: "Tour Résidentielle Elysée",
    client: "Constructions Modernes",
    status: "En cours",
    concreteQuantity: "1200",
    description: "Construction d'une tour résidentielle de 15 étages avec commerces au rez-de-chaussée",
    location: "Alger Centre",
    dates: "15/01/2023 - 30/06/2024",
    clientId: 1
  },
  {
    id: 2,
    name: "Pont Maritime",
    client: "Constructions Modernes",
    status: "Planifié",
    concreteQuantity: "3500",
    description: "Construction d'un pont maritime pour accès direct au terminal portuaire",
    location: "Port d'Alger",
    dates: "01/04/2024 - 15/10/2025",
    clientId: 1
  },
  {
    id: 3,
    name: "Centre Commercial Méditerranée",
    client: "Constructions Modernes",
    status: "Terminé",
    concreteQuantity: "2800",
    description: "Construction d'un centre commercial sur 3 niveaux avec parking souterrain",
    location: "Bab Ezzouar",
    dates: "10/06/2021 - 20/03/2023",
    clientId: 1
  },
  {
    id: 4,
    name: "Rénovation Hôtel Palace",
    client: "Constructions Modernes",
    status: "En cours",
    concreteQuantity: "450",
    description: "Rénovation complète d'un hôtel 5 étoiles incluant façade et intérieurs",
    location: "Hydra",
    dates: "05/09/2023 - 28/02/2024",
    clientId: 1
  },
  {
    id: 5,
    name: "Hôpital Universitaire",
    client: "Constructions Modernes",
    status: "Planifié",
    concreteQuantity: "4200",
    description: "Construction d'un hôpital universitaire de 300 lits avec équipements modernes",
    location: "Birkhadem",
    dates: "01/07/2024 - 31/12/2026",
    clientId: 1
  },
  {
    id: 6,
    name: "Projet Résidentiel Alger",
    client: "SPA Promotech",
    status: "En cours",
    concreteQuantity: "250",
    description: "Construction d'un ensemble résidentiel",
    location: "Alger",
    dates: "01/02/2023 - 30/08/2024",
    clientId: 2
  },
];

interface ProjectCardProps {
  project: typeof mockProjects[0];
}

const ProjectStatusBadge = ({ status }: { status: string }) => {
  let bgColor = "";
  
  switch (status) {
    case "En cours":
      bgColor = "bg-blue-500/20 text-blue-400";
      break;
    case "Terminé":
      bgColor = "bg-green-500/20 text-green-400";
      break;
    case "Planifié":
      bgColor = "bg-amber-500/20 text-amber-400";
      break;
    default:
      bgColor = "bg-gray-500/20 text-gray-400";
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
      {status}
    </span>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-white">{project.name}</h3>
        <ProjectStatusBadge status={project.status} />
      </div>
      
      <p className="text-gray-400 text-sm mb-4">{project.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-300">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">{project.location}</span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Package className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">Volume: {project.concreteQuantity} m³</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700/30 text-sm text-gray-400">
        {project.dates}
      </div>
    </div>
  );
};

const ClientDetailPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const parsedClientId = clientId ? parseInt(clientId) : 0;
  
  const client = getClientById(parsedClientId);
  const clientProjects = mockProjects.filter(project => project.clientId === parsedClientId);
  
  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 text-gray-300 hover:text-white"
            onClick={() => navigate("/clients")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux clients
          </Button>
          
          <div className="text-center p-12">
            <h2 className="text-2xl font-bold mb-4">Client non trouvé</h2>
            <p className="text-gray-400">Le client demandé n'existe pas ou a été supprimé.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto p-6"
      >
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-300 hover:text-white"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux clients
        </Button>
        
        <h1 className="text-2xl font-bold mb-8">{client.nom}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-900/90 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Informations du client
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  onClick={() => navigate(`/client/${client.id}`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Entreprise</p>
                    <p className="text-white font-medium flex items-center gap-2 mt-1">
                      <Building className="h-4 w-4 text-gray-400" />
                      {client.raisonSociale}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-400">Personne de contact</p>
                    <p className="text-white font-medium flex items-center gap-2 mt-1">
                      <User className="h-4 w-4 text-gray-400" />
                      {client.contactName}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-400">Email</p>
                    <p className="text-white font-medium flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {client.email}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-400">Téléphone</p>
                    <p className="text-white font-medium flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {client.telephone}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-400">Localisation</p>
                    <p className="text-white font-medium flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {client.ville}, {client.region}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Project Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-gray-900/90 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-400" />
                  Résumé des projets
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-purple-900/20 border-purple-800/30">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-gray-400">Total des projets</p>
                      <p className="text-3xl font-bold text-white mt-2">{clientProjects.length}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-900/20 border-blue-800/30">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-gray-400">En cours</p>
                      <p className="text-3xl font-bold text-white mt-2">{clientProjects.filter(p => p.status === "En cours").length}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-900/20 border-amber-800/30">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-gray-400">Planifiés</p>
                      <p className="text-3xl font-bold text-white mt-2">{clientProjects.filter(p => p.status === "Planifié").length}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-900/20 border-green-800/30">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-gray-400">Terminés</p>
                      <p className="text-3xl font-bold text-white mt-2">{clientProjects.filter(p => p.status === "Terminé").length}</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Chantiers du client</h2>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau chantier
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
        
        {/* Products Price Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Prix des produits</h2>
          <Card className="bg-gray-900/90 border-gray-800">
            <CardContent className="p-6">
              <ProductPriceForm clientId={parsedClientId} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClientDetailPage;
