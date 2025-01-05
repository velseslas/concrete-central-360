import { Button } from "@/components/ui/button";
import { Edit, Trash, Building, FileText } from "lucide-react";

interface ClientActionsProps {
  client: any;
  onEdit: (client: any) => void;
  onAddProject: (client: any) => void;
  onDocumentUpload: (client: any) => void;
  onDelete: (clientId: number) => void;
}

export function ClientActions({
  client,
  onEdit,
  onAddProject,
  onDocumentUpload,
  onDelete,
}: ClientActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(client)}
        className="hover:bg-gray-700/50"
      >
        <Edit className="h-4 w-4 text-blue-400" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onAddProject(client)}
        className="hover:bg-gray-700/50"
      >
        <Building className="h-4 w-4 text-green-400" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDocumentUpload(client)}
        className="hover:bg-gray-700/50"
      >
        <FileText className="h-4 w-4 text-yellow-400" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(client.id)}
        className="hover:bg-gray-700/50"
      >
        <Trash className="h-4 w-4 text-red-400" />
      </Button>
    </div>
  );
}