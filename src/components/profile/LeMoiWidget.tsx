import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin } from "lucide-react";

export function LeMoiWidget() {
  // Exemple de données utilisateur
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de Paris, 75001 Paris"
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
        <CardHeader className="py-3">
          <CardTitle className="text-white flex items-center gap-2 text-xl font-bold">
            <User className="w-6 h-6" />
            Le Moi
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-400" />
              <span>{userInfo.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>{userInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>{userInfo.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}