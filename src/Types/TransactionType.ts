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

export type filterType = "All Time" | "Today" | "This Week" | "This Month" | "This Year";

export type MonthsFull =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec"
  | "This Year";

export type sortType = "date" | "category" | "transaction" | "amount" | "type" | "action"; 