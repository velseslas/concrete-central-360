
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, subDays, subMonths, subQuarters, subWeeks, subYears } from "date-fns";
import { fr } from "date-fns/locale";
import { ExpensesWidget } from "@/components/finance/ExpensesWidget";

type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type ExpenseCategory = "general" | "vehicles" | "concrete" | "all";

interface ExpenseReportTableProps {
  reportPeriod: ReportPeriod;
  expenseCategory: ExpenseCategory;
  selectedDate?: Date;
  preview?: boolean;
}

// Données de simulation pour le rapport
const mockExpensesData = [
  {
    id: 1,
    date: subDays(new Date(), 2),
    category: "general",
    description: "Fournitures de bureau",
    supplier: "Bureau Plus",
    amount: 50000
  },
  {
    id: 2,
    date: subDays(new Date(), 5),
    category: "vehicles",
    description: "Carburant",
    supplier: "Station Total",
    amount: 75000
  },
  {
    id: 3,
    date: subDays(new Date(), 10),
    category: "concrete",
    description: "Maintenance malaxeur",
    supplier: "Technique Services",
    amount: 120000
  },
  {
    id: 4,
    date: subMonths(new Date(), 1),
    category: "vehicles",
    description: "Pneus camion",
    supplier: "Pneumatiques Pro",
    amount: 350000
  },
  {
    id: 5,
    date: subMonths(new Date(), 2),
    category: "general",
    description: "Équipements de sécurité",
    supplier: "Safety First",
    amount: 85000
  },
  {
    id: 6,
    date: subMonths(new Date(), 3),
    category: "concrete",
    description: "Pièces de rechange",
    supplier: "Technique Services",
    amount: 210000
  }
];

export function ExpenseReportTable({ 
  reportPeriod,
  expenseCategory,
  selectedDate = new Date(),
  preview = false
}: ExpenseReportTableProps) {
  // Filtrer les dépenses en fonction de la période et de la catégorie
  const getFilteredExpenses = () => {
    let startDate = new Date();
    
    switch (reportPeriod) {
      case "daily":
        startDate = subDays(selectedDate, 1);
        break;
      case "weekly":
        startDate = subWeeks(selectedDate, 1);
        break;
      case "monthly":
        startDate = subMonths(selectedDate, 1);
        break;
      case "quarterly":
        startDate = subQuarters(selectedDate, 1);
        break;
      case "yearly":
        startDate = subYears(selectedDate, 1);
        break;
    }
    
    return mockExpensesData.filter(expense => {
      const dateMatches = expense.date >= startDate;
      const categoryMatches = expenseCategory === "all" || expense.category === expenseCategory;
      return dateMatches && categoryMatches;
    });
  };

  const filteredExpenses = getFilteredExpenses();
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const getPeriodTitle = (): string => {
    switch (reportPeriod) {
      case "daily": return "Rapport Quotidien";
      case "weekly": return "Rapport Hebdomadaire";
      case "monthly": return "Rapport Mensuel";
      case "quarterly": return "Rapport Trimestriel";
      case "yearly": return "Rapport Annuel";
      default: return "Rapport";
    }
  };

  const getCategoryTitle = (): string => {
    switch (expenseCategory) {
      case "general": return "Achat Générale";
      case "vehicles": return "Parc Roulant";
      case "concrete": return "Centrale à Béton";
      case "all": return "Tous les achats";
      default: return "";
    }
  };

  // Si aucune dépense trouvée
  if (filteredExpenses.length === 0) {
    return (
      <div className={`text-center py-12 ${preview ? "text-gray-800" : "text-gray-400"}`}>
        Aucune dépense trouvée pour cette période et cette catégorie.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center border-b pb-4">
        <h2 className={`text-2xl font-bold ${preview ? "text-gray-800" : "text-white"}`}>
          {getPeriodTitle()} - {getCategoryTitle()}
        </h2>
        <p className={`${preview ? "text-gray-600" : "text-gray-400"}`}>
          Période: {format(selectedDate, "d MMMM yyyy", { locale: fr })}
        </p>
        <p className={`${preview ? "text-gray-600" : "text-gray-400"}`}>
          Généré le {format(new Date(), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
        </p>
      </div>

      <Table className={preview ? "border-collapse" : ""}>
        <TableHeader className={preview ? "bg-gray-100" : "bg-gray-800/50"}>
          <TableRow>
            <TableHead className={preview ? "border px-4 py-2 text-gray-700" : "text-gray-300"}>Date</TableHead>
            <TableHead className={preview ? "border px-4 py-2 text-gray-700" : "text-gray-300"}>Description</TableHead>
            <TableHead className={preview ? "border px-4 py-2 text-gray-700" : "text-gray-300"}>Fournisseur</TableHead>
            <TableHead className={`${preview ? "border px-4 py-2 text-gray-700" : "text-gray-300"} text-right`}>Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow key={expense.id} className={preview ? "hover:bg-gray-50" : "hover:bg-gray-800/30"}>
              <TableCell className={preview ? "border px-4 py-2" : "text-gray-300"}>
                {format(expense.date, "d MMMM yyyy", { locale: fr })}
              </TableCell>
              <TableCell className={preview ? "border px-4 py-2" : "text-gray-300"}>
                {expense.description}
              </TableCell>
              <TableCell className={preview ? "border px-4 py-2" : "text-gray-300"}>
                {expense.supplier}
              </TableCell>
              <TableCell className={`${preview ? "border px-4 py-2" : "text-gray-300"} text-right`}>
                {expense.amount.toLocaleString()} DA
              </TableCell>
            </TableRow>
          ))}
          <TableRow className={preview ? "bg-gray-100 font-bold" : "bg-gray-800/50 font-bold"}>
            <TableCell colSpan={3} className={`${preview ? "border px-4 py-2 text-gray-700" : "text-white"} text-right`}>
              Total:
            </TableCell>
            <TableCell className={`${preview ? "border px-4 py-2 text-gray-700" : "text-white"} text-right`}>
              {totalAmount.toLocaleString()} DA
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {!preview && expenseCategory !== "all" && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Répartition des Dépenses</h3>
          <ExpensesWidget />
        </div>
      )}
    </div>
  );
}
