import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Production {
  id: string;
  date: string;
  client: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
}

export function ProductionWidget() {
  const [isNewProductionOpen, setIsNewProductionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formulation, setFormulation] = useState("");
  const [volume, setVolume] = useState("");
  const [client, setClient] = useState("");

  // Exemple de données
  const productions: Production[] = [
    {
      id: "PRD001",
      date: "2024-03-20",
      client: "Client A",
      formulation: "B25",
      volume: 30,
      status: "completed",
    },
    {
      id: "PRD002",
      date: "2024-03-20",
      client: "Client B",
      formulation: "B30",
      volume: 45,
      status: "in_progress",
    },
    {
      id: "PRD003",
      date: "2024-03-20",
      client: "Client C",
      formulation: "B40",
      volume: 25,
      status: "pending",
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvelle production:", { client, formulation, volume });
    toast.success("Production créée avec succès");
    setIsNewProductionOpen(false);
    setFormulation("");
    setVolume("");
    setClient("");
  };

  const getStatusBadge = (status: Production["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminée", className: "bg-green-100 text-green-800" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              Productions du jour
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher une production..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                />
              </div>
              <Dialog open={isNewProductionOpen} onOpenChange={setIsNewProductionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-white border-gray-700 hover:bg-gray-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle Production
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white border-gray-700">
                  <DialogHeader>
                    <DialogTitle>Nouvelle Production</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Select value={client} onValueChange={setClient}>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="client-a">Client A</SelectItem>
                          <SelectItem value="client-b">Client B</SelectItem>
                          <SelectItem value="client-c">Client C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formulation">Formulation</Label>
                      <Select value={formulation} onValueChange={setFormulation}>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Sélectionner une formulation" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="B25">B25</SelectItem>
                          <SelectItem value="B30">B30</SelectItem>
                          <SelectItem value="B40">B40</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume (m³)</Label>
                      <Input
                        id="volume"
                        type="number"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Entrer le volume"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Créer la production
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productions.map((production) => (
              <motion.div
                key={production.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      {production.id}
                    </h3>
                    <p className="text-gray-400 text-sm">{production.client}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-medium">{production.volume} m³</p>
                      <p className="text-gray-400 text-sm">{production.date}</p>
                    </div>
                    <div>
                      {getStatusBadge(production.status)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}