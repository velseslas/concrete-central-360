import { toast } from "sonner";
import { CategoryCard } from "./category/CategoryCard";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface ProductCategoryListProps {
  onEdit: (category: Category) => void;
}

const mockCategories = [
  {
    id: 1,
    name: "Ciment",
    description: "Tous types de ciment"
  },
  {
    id: 2,
    name: "Gravier",
    description: "Différentes tailles de gravier"
  },
  {
    id: 3,
    name: "Sable",
    description: "Sable de construction"
  }
];

export function ProductCategoryList({ onEdit }: ProductCategoryListProps) {
  const handleDelete = (categoryId: number) => {
    console.log("Deleting category:", categoryId);
    toast.success("Catégorie supprimée");
  };

  return (
    <div className="space-y-4">
      {mockCategories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={handleDelete}
          index={index}
        />
      ))}
    </div>
  );
}