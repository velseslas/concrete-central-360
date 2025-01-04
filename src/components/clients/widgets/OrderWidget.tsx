import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function OrderWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-emerald-800">Commandes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Content will be added later */}
        </CardContent>
      </Card>
    </motion.div>
  );
}