import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export const CompanyInfoWidget = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    siret: "",
  });

  const handleChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving company info:", companyInfo);
    toast.success("Coordonnées de la société mises à jour");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nom de la société</Label>
          <Input
            value={companyInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label>Adresse</Label>
          <Textarea
            value={companyInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label>Téléphone</Label>
          <Input
            value={companyInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={companyInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label>SIRET</Label>
          <Input
            value={companyInfo.siret}
            onChange={(e) => handleChange("siret", e.target.value)}
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <Button 
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
        >
          Enregistrer
        </Button>
      </div>
    </motion.div>
  );
};