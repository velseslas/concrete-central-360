
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Wrench, Map, Settings, AlertTriangle } from "lucide-react";

interface VehicleActionsProps {
  onDocumentsClick: () => void;
  onScheduleClick: () => void;
  onHistoryClick: () => void;
  onLocationClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const VehicleActions = ({
  onDocumentsClick,
  onScheduleClick,
  onHistoryClick,
  onLocationClick,
  onEditClick,
  onDeleteClick
}: VehicleActionsProps) => {
  return (
    <div className="space-y-4 pt-2 pb-4 border-t border-b border-gray-700">
      <h3 className="text-lg font-medium text-white pt-4">Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white" 
          onClick={onDocumentsClick}
        >
          <FileText className="mr-2 h-5 w-5" />
          Documents
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-600 hover:bg-gray-700 text-white" 
          onClick={onScheduleClick}
        >
          <Calendar className="mr-2 h-5 w-5" />
          Planifier
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-600 hover:bg-gray-700 text-white" 
          onClick={onHistoryClick}
        >
          <Wrench className="mr-2 h-5 w-5" />
          Historique
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-600 hover:bg-gray-700 text-white" 
          onClick={onLocationClick}
        >
          <Map className="mr-2 h-5 w-5" />
          Localiser
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-600 hover:bg-gray-700 text-white" 
          onClick={onEditClick}
        >
          <Settings className="mr-2 h-5 w-5" />
          Modifier
        </Button>
        
        <Button 
          variant="outline" 
          className="text-red-400 hover:text-red-300 hover:border-red-400 hover:bg-red-400/10" 
          onClick={onDeleteClick}
        >
          <AlertTriangle className="mr-2 h-5 w-5" />
          Supprimer
        </Button>
      </div>
    </div>
  );
};
