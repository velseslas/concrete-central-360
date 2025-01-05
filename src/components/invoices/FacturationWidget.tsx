import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function FacturationWidget() {
  return (
    <Card className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Facturation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-white/60 text-sm">Factures en attente</p>
              <p className="text-white text-2xl font-bold">12</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/60 text-sm">Montant total</p>
              <p className="text-white text-2xl font-bold">25,000 DA</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}