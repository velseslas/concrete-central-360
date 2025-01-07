import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { PaymentForm } from "@/components/clients/PaymentForm";

export function Header() {
  const location = useLocation();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const getPageTitle = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const handleNewPayment = () => {
    console.log("Opening new payment form");
    setShowPaymentForm(true);
    toast.success("Ouverture du formulaire de paiement");
  };

  const showNewPaymentButton = location.pathname.includes("/finance/payments");

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex gap-6 md:gap-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {getPageTitle(location.pathname)}
            </h2>
          </div>

          {showNewPaymentButton && (
            <Button 
              onClick={handleNewPayment}
              className="bg-primary hover:bg-primary-600 text-primary-foreground transition-colors duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Paiement
            </Button>
          )}
        </div>
      </motion.header>

      {showPaymentForm && (
        <PaymentForm 
          open={showPaymentForm} 
          onOpenChange={setShowPaymentForm}
          clientId={1}
        />
      )}
    </>
  );
}