import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function AdminDocumentsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-blue-800">Documents Administratifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/50 border border-blue-100">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">Documents requis</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li>Registre de commerce</li>
                <li>Carte d'identification fiscale</li>
                <li>Attestation d'activité</li>
                <li>Statuts de l'entreprise</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/50 border border-blue-100">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">Documents optionnels</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li>Certificats de qualité</li>
                <li>Références clients</li>
                <li>Attestations de bonne exécution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}