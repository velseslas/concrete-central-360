
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, UserPlus, Calculator, DollarSign } from "lucide-react";
import { SalaryAdvance } from "./types";
import { formatDate } from "./salaryUtils";

interface AdvancesTabProps {
  advances: SalaryAdvance[];
  onAddAdvance: () => void;
  onApproveAdvance: (advanceId: string) => void;
  onRejectAdvance: (advanceId: string) => void;
}

export function AdvancesTab({ 
  advances, 
  onAddAdvance, 
  onApproveAdvance, 
  onRejectAdvance 
}: AdvancesTabProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center gap-2">
          <Receipt className="h-5 w-5 text-yellow-400" />
          Gestion des acomptes
        </CardTitle>
        <Button 
          onClick={onAddAdvance}
          className="bg-[#9b87f5] hover:bg-[#8a76e5]"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Nouvel acompte
        </Button>
      </CardHeader>
      <CardContent>
        <Table className="text-white">
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {advances.length > 0 ? (
              advances.map((advance) => (
                <TableRow key={advance.id} className="border-gray-700">
                  <TableCell>{advance.employee_name || 'Employé'}</TableCell>
                  <TableCell>{formatDate(advance.date)}</TableCell>
                  <TableCell>{advance.amount} DA</TableCell>
                  <TableCell>{advance.description || '-'}</TableCell>
                  <TableCell>
                    <span className={`${
                      advance.status === 'approved' 
                        ? 'bg-green-500/20 text-green-400' 
                        : advance.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-orange-500/20 text-orange-400'
                    } px-2 py-1 rounded-full text-xs`}>
                      {advance.status === 'approved' 
                        ? 'Validé' 
                        : advance.status === 'rejected'
                          ? 'Rejeté'
                          : 'En attente'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {advance.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 bg-green-700/30 hover:bg-green-600/50 text-green-400"
                          onClick={() => onApproveAdvance(advance.id)}
                        >
                          <Calculator className="h-4 w-4 mr-1" />
                          Valider
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 bg-red-700/30 hover:bg-red-600/50 text-red-400"
                          onClick={() => onRejectAdvance(advance.id)}
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Refuser
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Aucun acompte trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
