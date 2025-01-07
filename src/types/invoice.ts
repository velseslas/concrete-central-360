export interface Invoice {
  id: string;
  client: string;
  amount: string;
  date: string;
  status: "paid" | "unpaid" | "validated";
}