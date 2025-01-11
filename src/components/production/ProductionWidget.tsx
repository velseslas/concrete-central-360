import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ProductionWidget() {
  console.log("Rendering ProductionWidget"); // Debug log

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-gray-100 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Production
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
            {/* Production content will go here */}
            <p className="text-gray-300">Module de production</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}