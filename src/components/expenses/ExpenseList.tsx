
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface ExpenseListProps {
  onEdit: (expense: any) => void;
  category: string;
}

const mockExpenses = [
  {
    id: 1,
    date: "2024-02-20",
    category: "concrete",
    amount: 1500,
    description: "Réparation du malaxeur",
    supplier: "Technique Services",
  },
  {
    id: 2,
    date: "2024-02-21",
    category: "vehicles",
    amount: 2000,
    description: "Vidange camion",
    supplier: "Auto Service",
  },
  {
    id: 3,
    date: "2024-02-22",
    category: "general",
    amount: 500,
    description: "Fournitures de bureau",
    supplier: "Bureau Plus",
  },
];

const ExpenseList = ({ onEdit, category }: ExpenseListProps) => {
  const handleDelete = (id: number) => {
    console.log("Deleting expense:", id);
    toast.success("Dépense supprimée");
  };

  // Filter expenses based on category
  const filteredExpenses = mockExpenses.filter(expense => expense.category === category);

  return (
    <div className="rounded-lg border border-[#9b87f5]/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-[#1A1F2C]/50 border-b border-[#9b87f5]/20">
            <TableHead className="text-[#9b87f5]">Date</TableHead>
            <TableHead className="text-[#9b87f5]">Catégorie</TableHead>
            <TableHead className="text-[#9b87f5]">Montant</TableHead>
            <TableHead className="text-[#9b87f5]">Fournisseur</TableHead>
            <TableHead className="text-[#9b87f5]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow 
              key={expense.id}
              className="hover:bg-[#1A1F2C]/50 border-b border-[#9b87f5]/20"
            >
              <TableCell className="text-gray-300">
                {new Date(expense.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-gray-300 capitalize">
                {expense.category}
              </TableCell>
              <TableCell className="text-gray-300">
                {expense.amount.toLocaleString()} DA
              </TableCell>
              <TableCell className="text-gray-300">
                {expense.supplier}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(expense)}
                    className="text-[#9b87f5] hover:text-white hover:bg-[#9b87f5]/20"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(expense.id)}
                    className="text-[#9b87f5] hover:text-white hover:bg-[#9b87f5]/20"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseList;
