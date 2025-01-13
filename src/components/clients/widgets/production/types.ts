export interface Production {
  id: number;
  order_id: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
  start_date: string;
  end_date: string | null;
  notes: string | null;
  client: string;
  project: string;
}

export interface Order {
  id: string;
  client: string;
  project: string;
  formulation: string;
  volume: number;
}