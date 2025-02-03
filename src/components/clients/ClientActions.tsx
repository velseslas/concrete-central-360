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
    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(client)}
        className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-colors"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewProjects(client)}
        className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <Building className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDocumentUpload(client)}
        className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        <FileText className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(client.id)}
        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}