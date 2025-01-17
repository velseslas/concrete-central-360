import { Button } from "@/components/ui/button";
import { Edit, Trash, Building, FileText } from "lucide-react";

interface ClientActionsProps {
  client: any;
  onEdit: (client: any) => void;
  onViewProjects: (client: any) => void;
  onDocumentUpload: (client: any) => void;
  onDelete: (clientId: number) => void;
}

export function ClientActions({
  client,
  onEdit,
  onViewProjects,
  onDocumentUpload,
  onDelete,
}: ClientActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(client)}
        className="hover:bg-purple-500/20 transition-colors"
      >
        <Edit className="h-4 w-4 text-purple-400" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewProjects(client)}
        className="hover:bg-blue-500/20 transition-colors"
      >
        <Building className="h-4 w-4 text-blue-400" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDocumentUpload(client)}
        className="bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
      >
        <FileText className="h-4 w-4 text-indigo-400" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(client.id)}
        className="hover:bg-red-500/20 transition-colors"
      >
        <Trash className="h-4 w-4 text-red-400" />
      </Button>
    </div>
  );
}