import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ProjectWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-cyan-800">Projets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/50 border border-cyan-100">
                <h3 className="font-semibold mb-2 text-cyan-900">Projets en cours</h3>
                <p className="text-2xl font-bold text-blue-500">12</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 border border-cyan-100">
                <h3 className="font-semibold mb-2 text-cyan-900">Projets terminés</h3>
                <p className="text-2xl font-bold text-emerald-500">45</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-cyan-900">Derniers projets</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-white/50 border border-cyan-100 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-cyan-900">Projet {index + 1}</p>
                      <p className="text-sm text-cyan-600">Client {index + 1}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600 border border-blue-200">
                      En cours
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}