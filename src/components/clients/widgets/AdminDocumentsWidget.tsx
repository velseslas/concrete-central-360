import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileCheck, FilePlus } from "lucide-react";
import { motion } from "framer-motion";

export function AdminDocumentsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Documents Administratifs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Documents requis
              </h3>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Registre de commerce</li>
                <li>Carte d'identification fiscale</li>
                <li>Attestation d'activité</li>
                <li>Statuts de l'entreprise</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                <FilePlus className="h-5 w-5" />
                Documents optionnels
              </h3>
              <ul className="list-disc list-inside space-y-2 text-white/80">
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