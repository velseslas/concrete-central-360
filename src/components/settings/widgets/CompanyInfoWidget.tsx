import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const CompanyInfoWidget = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    siret: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informations de la société mises à jour");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">Coordonnées Société</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="company-name" className="text-sm text-gray-300">
            Nom de la société
          </label>
          <Input
            id="company-name"
            name="name"
            value={companyInfo.name}
            onChange={handleChange}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company-address" className="text-sm text-gray-300">
            Adresse
          </label>
          <Textarea
            id="company-address"
            name="address"
            value={companyInfo.address}
            onChange={handleChange}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company-phone" className="text-sm text-gray-300">
            Téléphone
          </label>
          <Input
            id="company-phone"
            name="phone"
            value={companyInfo.phone}
            onChange={handleChange}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company-email" className="text-sm text-gray-300">
            Email
          </label>
          <Input
            id="company-email"
            name="email"
            type="email"
            value={companyInfo.email}
            onChange={handleChange}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company-siret" className="text-sm text-gray-300">
            SIRET
          </label>
          <Input
            id="company-siret"
            name="siret"
            value={companyInfo.siret}
            onChange={handleChange}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>

        <Button type="submit" className="w-full">
          Sauvegarder
        </Button>
      </form>
    </div>
  );
};