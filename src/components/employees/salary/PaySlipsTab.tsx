
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { format } from "date-fns";

interface PaySlipsTabProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function PaySlipsTab({ selectedMonth, onMonthChange }: PaySlipsTabProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          Fiches de paie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <Label htmlFor="month-select" className="whitespace-nowrap">Sélectionner un mois:</Label>
            <Input
              id="month-select"
              type="month"
              className="w-48 bg-gray-700 border-gray-600"
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
            />
            <Button 
              className="bg-[#9b87f5] hover:bg-[#8a76e5]"
              disabled={!selectedMonth}
            >
              <FileText className="h-4 w-4 mr-2" />
              Générer toutes les fiches
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Card className="w-full sm:w-64 bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors">
              <CardContent className="p-4">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                  <h3 className="font-bold text-white">Août 2023</h3>
                  <p className="text-gray-300 text-sm">Toutes les fiches de paie</p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full sm:w-64 bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors">
              <CardContent className="p-4">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                  <h3 className="font-bold text-white">Juillet 2023</h3>
                  <p className="text-gray-300 text-sm">Toutes les fiches de paie</p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full sm:w-64 bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors">
              <CardContent className="p-4">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                  <h3 className="font-bold text-white">Juin 2023</h3>
                  <p className="text-gray-300 text-sm">Toutes les fiches de paie</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
