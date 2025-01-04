import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ProjectWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle>Projets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="font-semibold mb-2">Projets en cours</h3>
                <p className="text-2xl font-bold text-blue-400">12</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="font-semibold mb-2">Projets terminés</h3>
                <p className="text-2xl font-bold text-green-400">45</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Derniers projets</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-gray-700/30 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">Projet {index + 1}</p>
                      <p className="text-sm text-gray-400">Client {index + 1}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
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