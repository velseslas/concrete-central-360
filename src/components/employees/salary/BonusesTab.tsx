
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Percent, UserPlus } from "lucide-react";
import { SalesBonus } from "./types";
import { formatDate } from "./salaryUtils";

interface BonusesTabProps {
  bonuses: SalesBonus[];
  bonusPerCubicMeter: string;
  onAddSalesVolume: () => void;
  onUpdateBonusRate: () => void;
}

export function BonusesTab({ 
  bonuses, 
  bonusPerCubicMeter, 
  onAddSalesVolume, 
  onUpdateBonusRate 
}: BonusesTabProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          Primes sur ventes de béton
        </CardTitle>
        <div className="flex items-center gap-2 text-white">
          <span>Prime actuelle:</span>
          <span className="font-bold text-green-400">{bonusPerCubicMeter} DA / m³</span>
          <Button 
            variant="outline" 
            className="h-8 bg-gray-700 hover:bg-gray-600"
            onClick={onUpdateBonusRate}
          >
            <Percent className="h-4 w-4 mr-1" />
            Modifier
          </Button>
          <Button 
            className="h-8 bg-[#9b87f5] hover:bg-[#8a76e5]"
            onClick={onAddSalesVolume}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Ajouter volume
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table className="text-white">
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead>Vendeur</TableHead>
              <TableHead>Mois</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Chantier</TableHead>
              <TableHead>Volume vendu (m³)</TableHead>
              <TableHead>Taux de prime</TableHead>
              <TableHead>Prime totale</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bonuses.length > 0 ? (
              bonuses.map((bonus) => (
                <TableRow key={bonus.id} className="border-gray-700">
                  <TableCell>{bonus.employee_name || 'Vendeur'}</TableCell>
                  <TableCell>{formatDate(bonus.month)}</TableCell>
                  <TableCell>{bonus.client_name || '-'}</TableCell>
                  <TableCell>{bonus.project_name || '-'}</TableCell>
                  <TableCell>{bonus.volume_sold} m³</TableCell>
                  <TableCell>{bonus.bonus_per_cubic_meter} DA / m³</TableCell>
                  <TableCell className="font-bold text-green-400">{bonus.total_bonus} DA</TableCell>
                  <TableCell>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      {bonus.status === 'calculated' ? 'Calculé' : bonus.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Aucune prime trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
