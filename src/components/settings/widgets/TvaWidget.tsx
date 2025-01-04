import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const TvaWidget = () => {
  const [tvaRate, setTvaRate] = useState("20");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Taux de TVA mis à jour");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">TVA</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="tva-rate" className="text-sm text-gray-300">
            Taux de TVA (%)
          </label>
          <Input
            id="tva-rate"
            type="number"
            value={tvaRate}
            onChange={(e) => setTvaRate(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>

        <Button type="submit" className="w-full">
          Sauvegarder
        </Button>
      </form>
    </div>
  );
};