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
        variant="outline"
        size="sm"
        onClick={() => onEdit(client)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddProject(client)}
      >
        <Building className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDocumentUpload(client)}
      >
        <FileText className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDelete(client.id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}