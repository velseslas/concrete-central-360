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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Fournisseur</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredExpenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{expense.amount} DA</TableCell>
            <TableCell>{expense.supplier}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(expense)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(expense.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpenseList;