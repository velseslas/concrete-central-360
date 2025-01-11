export interface Quote {
  id: string;
  client: string;
  amount: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
  description?: string;
  validUntil?: string;
}

export interface QuoteFilters {
  startDate: string;
  endDate: string;
  minAmount: string;
  maxAmount: string;
  status: string;
}