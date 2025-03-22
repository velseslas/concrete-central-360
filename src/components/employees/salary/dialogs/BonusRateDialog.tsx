
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BonusRateDialogProps {
  bonusPerCubicMeter: string;
  onBonusRateChange: (rate: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function BonusRateDialog({
  bonusPerCubicMeter,
  onBonusRateChange,
  onSubmit,
  onCancel
}: BonusRateDialogProps) {
  return (
    <DialogContent className="bg-gray-800 text-white border-gray-700">
      <DialogHeader>
        <DialogTitle className="text-white">
          Modifier le taux de prime
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="bonus-rate">Taux de prime par m³ (DA)</Label>
          <Input 
            id="bonus-rate" 
            type="number" 
            value={bonusPerCubicMeter}
            onChange={(e) => onBonusRateChange(e.target.value)}
            placeholder="Taux en dinars algériens" 
            className="bg-gray-700 border-gray-600"
            step="0.1"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          Annuler
        </Button>
        <Button 
          onClick={onSubmit}
          className="bg-[#9b87f5] hover:bg-[#8a76e5]"
        >
          Mettre à jour
        </Button>
      </div>
    </DialogContent>
  );
}
