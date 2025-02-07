
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <div className="space-y-4">
      {filteredExpenses.map((expense) => (
        <motion.div
          key={expense.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-lg bg-[#1A1F2C]/50 backdrop-blur-sm border border-[#9b87f5]/20 hover:border-[#9b87f5]/30 transition-colors"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-white font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#9b87f5]" />
                {expense.description}
              </h3>
              <p className="text-gray-400 text-sm">{expense.supplier}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="text-right">
                <p className="text-white font-medium">
                  {expense.amount.toLocaleString()} DA
                </p>
                <p className="text-gray-400 text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(expense)}
                  className="h-8 w-8 text-[#9b87f5] hover:text-white hover:bg-[#9b87f5]/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(expense.id)}
                  className="h-8 w-8 text-[#9b87f5] hover:text-white hover:bg-[#9b87f5]/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExpenseList;
