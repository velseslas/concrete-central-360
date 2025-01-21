import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Mail, Printer } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ProjectPreviewDialogProps {
  projects: any[];
  onOpenChange: (open: boolean) => void;
}

export function ProjectPreviewDialog({ projects, onOpenChange }: ProjectPreviewDialogProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('project-table');
      if (element) {
        const canvas = await html2canvas(element);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save('projets.pdf');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleEmail = () => {
    // Email functionality will be implemented later with a proper email service
    console.log('Send email with project data');
  };

  return (
    <DialogContent className="max-w-4xl bg-gray-900/95 border-gray-700">
      <DialogHeader>
        <DialogTitle className="text-white">Aperçu des Projets</DialogTitle>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            className="bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEmail}
            className="bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50"
          >
            <Mail className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
        </div>
      </DialogHeader>

      <div id="project-table" className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="text-gray-300">Client</TableHead>
              <TableHead className="text-gray-300">Nom du chantier</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Volume</TableHead>
              <TableHead className="text-gray-300">Date de création</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="border-b border-gray-700/50">
                <TableCell className="text-gray-300">{project.client}</TableCell>
                <TableCell className="text-gray-300">{project.name}</TableCell>
                <TableCell className="text-gray-300">{project.status}</TableCell>
                <TableCell className="text-gray-300">{project.concreteQuantity}m³</TableCell>
                <TableCell className="text-gray-300">
                  {new Date(project.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  );
}