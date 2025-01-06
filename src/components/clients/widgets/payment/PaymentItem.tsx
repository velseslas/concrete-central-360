import { Button } from "@/components/ui/button";
import { FilePen } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PaymentForm } from "../../PaymentForm";
import { useState } from "react";
import { PaymentFormValues } from "../../payment-form/types";

interface PaymentItemProps {
  client: {
    id: string;
    name: string;
    lastPayment: string;
    payments: Array<{
      id: number;
      amount: number;
      date: string;
      reference: string;
      paymentMethod: string;
      projectId: string;
    }>;
  };
  onViewDetails: (client: any) => void;
}

export function PaymentItem({ client, onViewDetails }: PaymentItemProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Créer l'objet paymentToEdit avec les données du dernier paiement
  const lastPayment = client.payments[0];
  const paymentToEdit: PaymentFormValues = {
    clientId: client.id,
    projectId: lastPayment.projectId,
    amount: lastPayment.amount.toString(),
    paymentMethod: lastPayment.paymentMethod,
    paymentDate: lastPayment.date,
    reference: lastPayment.reference,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
        onClick={() => onViewDetails(client)}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-white font-medium flex items-center gap-2">
              {client.name}
            </h3>
            <p className="text-gray-400 text-sm">
              Dernier paiement: {client.lastPayment}
            </p>
          </div>
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 text-purple-400 hover:text-purple-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Opening payment form for client:", client.name);
                      console.log("Payment data to edit:", paymentToEdit);
                      setShowPaymentForm(true);
                    }}
                  >
                    <FilePen className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Modifier les paiements</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>

      <PaymentForm 
        open={showPaymentForm} 
        onOpenChange={setShowPaymentForm}
        clientId={parseInt(client.id)}
        paymentToEdit={paymentToEdit}
      />
    </>
  );
}