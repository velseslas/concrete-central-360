import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Quote } from "../types";

interface QuoteListProps {
  quotes: Quote[];
  onQuoteClick: (quote: Quote) => void;
}

export function QuoteList({ quotes, onQuoteClick }: QuoteListProps) {
  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <motion.div
          key={quote.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onQuoteClick(quote)}
          className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-white font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                {quote.id}
              </h3>
              <p className="text-gray-400 text-sm">{quote.client}</p>
              {quote.description && (
                <p className="text-gray-500 text-sm mt-1">{quote.description}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="text-right">
                <p className="text-white font-medium">{quote.amount}</p>
                <p className="text-gray-400 text-sm">{quote.date}</p>
                {quote.validUntil && (
                  <p className="text-gray-500 text-xs">Valide jusqu'au {quote.validUntil}</p>
                )}
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  quote.status === "accepted" ? "bg-green-500/20 text-green-400" :
                  quote.status === "rejected" ? "bg-red-500/20 text-red-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {quote.status === "accepted" ? "Accepté" : 
                   quote.status === "rejected" ? "Refusé" : 
                   "En attente"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}