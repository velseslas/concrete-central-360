import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function OrderWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white">Commandes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Content will be added later */}
        </CardContent>
      </Card>
    </motion.div>
  );
}