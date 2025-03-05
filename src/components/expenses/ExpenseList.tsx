
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, DollarSign, Eye, FileDown } from "lucide-react";
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
    amount: 150000,
    description: "Réparation du malaxeur",
    supplier: "Technique Services",
    paymentMethod: "transfer"
  },
  {
    id: 2,
    date: "2024-02-21",
    category: "vehicles",
    amount: 200000,
    description: "Vidange camion",
    supplier: "Auto Service",
    paymentMethod: "check"
  },
  {
    id: 3,
    date: "2024-02-22",
    category: "general",
    amount: 50000,
    description: "Fournitures de bureau",
    supplier: "Bureau Plus",
    paymentMethod: "cash"
  },
  {
    id: 4,
    date: "2024-02-25",
    category: "concrete",
    amount: 85000,
    description: "Pièces de rechange",
    supplier: "Technique Services",
    paymentMethod: "transfer"
  },
  {
    id: 5,
    date: "2024-02-28",
    category: "vehicles",
    amount: 350000,
    description: "Changement pneus",
    supplier: "Pneu Express",
    paymentMethod: "transfer"
  },
];

const getPaymentMethodLabel = (method: string): string => {
  switch (method) {
    case 'cash': return 'Espèces';
    case 'check': return 'Chèque';
    case 'transfer': return 'Virement';
    case 'card': return 'Carte';
    default: return method;
  }
};

const ExpenseList = ({ onEdit, category }: ExpenseListProps) => {
  const handleDelete = (id: number) => {
    console.log("Deleting expense:", id);
    toast.success("Dépense supprimée");
  };

  const handleView = (expense: any) => {
    console.log("Viewing expense details:", expense);
    // Implement view details logic
  };

  const handleDownload = (expense: any) => {
    console.log("Downloading expense receipt:", expense);
    toast.success("Téléchargement en cours...");
  };

  // Filter expenses based on category
  const filteredExpenses = category === "all" 
    ? mockExpenses 
    : mockExpenses.filter(expense => expense.category === category);

  return (
    <div className="space-y-4">
      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Aucune dépense trouvée dans cette catégorie.
        </div>
      ) : (
        filteredExpenses.map((expense) => (
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
                <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-gray-400 text-sm">
                  <span>{expense.supplier}</span>
                  <span className="hidden md:inline">•</span>
                  <span>Paiement: {getPaymentMethodLabel(expense.paymentMethod)}</span>
                </div>
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
                    onClick={() => handleView(expense)}
                    className="h-8 w-8 text-[#9b87f5] hover:text-white hover:bg-[#9b87f5]/20"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(expense)}
                    className="h-8 w-8 text-[#9b87f5] hover:text-white hover:bg-[#9b87f5]/20"
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
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
        ))
      )}
    </div>
  );
};

export default ExpenseList;
