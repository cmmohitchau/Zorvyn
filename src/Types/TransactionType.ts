export type TransactionType = "Income" | "Expense";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  title: string;
}

export type Period = "Weekly" | "Monthly" | "Yearly";
