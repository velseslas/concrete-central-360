import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SupplierForm } from "@/components/suppliers/SupplierForm";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { toast } from "sonner";

const Suppliers = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState<any>(null);

  const handleEdit = (supplier: any) => {
    setSupplierToEdit(supplier);
    setIsFormOpen(true);
  };

  const handleDelete = (supplierId: number) => {
    console.log("Deleting supplier:", supplierId);
    toast.success("Fournisseur supprimé avec succès");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des fournisseurs</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau fournisseur
        </Button>
      </div>

      <SupplierList onEdit={handleEdit} onDelete={handleDelete} />

      <SupplierForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        supplierToEdit={supplierToEdit}
      />
    </div>
  );
};

export default Suppliers;