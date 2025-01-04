import { Card } from "@/components/ui/card";
import { TvaWidget } from "@/components/settings/widgets/TvaWidget";
import { CompanyInfoWidget } from "@/components/settings/widgets/CompanyInfoWidget";

const Settings = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Réglages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <TvaWidget />
        </Card>
        
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <CompanyInfoWidget />
        </Card>
      </div>
    </div>
  );
};

export default Settings;