import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Formulations = () => {
  const formulations = [
    {
      id: 1,
      nom: "B25",
      resistance: "25 MPa",
      ciment: "350 kg/m³",
      sable: "800 kg/m³",
      gravier: "1050 kg/m³",
      eau: "175 L/m³",
      status: "Active",
    },
    {
      id: 2,
      nom: "B30",
      resistance: "30 MPa",
      ciment: "400 kg/m³",
      sable: "750 kg/m³",
      gravier: "1100 kg/m³",
      eau: "180 L/m³",
      status: "Active",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Formulations</h1>
          <p className="text-gray-500">Gérez vos formulations de béton</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle formulation
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Résistance</TableHead>
              <TableHead>Ciment</TableHead>
              <TableHead>Sable</TableHead>
              <TableHead>Gravier</TableHead>
              <TableHead>Eau</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formulations.map((formulation) => (
              <TableRow key={formulation.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{formulation.nom}</TableCell>
                <TableCell>{formulation.resistance}</TableCell>
                <TableCell>{formulation.ciment}</TableCell>
                <TableCell>{formulation.sable}</TableCell>
                <TableCell>{formulation.gravier}</TableCell>
                <TableCell>{formulation.eau}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {formulation.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Formulations;