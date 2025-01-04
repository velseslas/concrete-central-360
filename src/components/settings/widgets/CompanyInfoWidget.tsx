import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const CompanyInfoWidget = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    siret: "",
  });

  const handleChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating company info:", companyInfo);
    toast.success("Informations de la société mises à jour");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white">Coordonnées Société</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="company-name" className="text-sm text-gray-300">
                Nom de la société
              </label>
              <Input
                id="company-name"
                value={companyInfo.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company-address" className="text-sm text-gray-300">
                Adresse
              </label>
              <Textarea
                id="company-address"
                value={companyInfo.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company-phone" className="text-sm text-gray-300">
                Téléphone
              </label>
              <Input
                id="company-phone"
                value={companyInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company-email" className="text-sm text-gray-300">
                Email
              </label>
              <Input
                id="company-email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company-siret" className="text-sm text-gray-300">
                SIRET
              </label>
              <Input
                id="company-siret"
                value={companyInfo.siret}
                onChange={(e) => handleChange("siret", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-gray-100"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 transition-colors duration-200"
            >
              Enregistrer les modifications
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};