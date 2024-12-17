import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface ExpenseListProps {
  onEdit: (expense: any) => void;
}

const mockExpenses = [
  {
    id: 1,
    date: "2024-02-20",
    category: "Maintenance",
    amount: 1500,
    description: "Réparation du malaxeur",
    supplier: "Technique Services",
  },
  // Add more mock expenses as needed
];

const ExpenseList = ({ onEdit }: ExpenseListProps) => {
  const handleDelete = (id: number) => {
    console.log("Deleting expense:", id);
    toast.success("Dépense supprimée");
  };

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
        {mockExpenses.map((expense) => (
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