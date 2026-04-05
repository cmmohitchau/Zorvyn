import { createSlice ,type PayloadAction } from "@reduxjs/toolkit";
import { type Period, type Transaction } from "@/Types/TransactionType";


type filterType = "All Time" | "Today" | "This Week" | "This Month" | "This Year";

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

type sortType = "date" | "category" | "transaction" | "amount" | "type"; 

interface TransactionState {
    list : Transaction[];
    period : Period;
    filter : filterType;
    selectedMonth : MonthsFull
    sortBy : sortType;
    sortOrder: boolean;
}



const SEED_TRANSACTIONS: Transaction[] = [
  { id: "t1", title: "Salary",            amount: 5200, type: "income",  category: "Salary",        date: "2026-04-01" },
  { id: "t2", title: "Netflix",           amount: 18,   type: "expense", category: "Entertainment", date: "2026-04-02" },
  { id: "t3", title: "Grocery Store",     amount: 134,  type: "expense", category: "Food",          date: "2026-04-03" },
  { id: "t4", title: "Freelance Project", amount: 1200, type: "income",  category: "Freelance",     date: "2026-04-04" },
  { id: "t5", title: "Electric Bill",     amount: 88,   type: "expense", category: "Utilities",     date: "2026-03-28" },
  { id: "t6", title: "Gym Membership",    amount: 45,   type: "expense", category: "Health",        date: "2026-03-15" },
  { id: "t7", title: "Dividends",         amount: 320,  type: "income",  category: "Investment",    date: "2026-02-10" },
  { id: "t8", title: "Rent",              amount: 1100, type: "expense", category: "Housing",       date: "2026-04-01" },
  { id: "t9", title: "Rent",              amount: 1100, type: "expense", category: "Housing",       date: "2025-04-01" },

];

const initialState: TransactionState = {
    list : SEED_TRANSACTIONS,
    period: "Monthly",
    filter: "All Time",
    sortBy : "date",
    sortOrder: false,
    selectedMonth: "Jan"
}

const transactionsSlice = createSlice({
    name : "transactions",
    initialState,
    reducers: {
        addTransaction(state, action: PayloadAction<Omit<Transaction, "id">>) {
            state.list.unshift({
                ...action.payload,
                id: "t_" + Date.now(),
            });
        },
        deleteTransaction: (state , action : PayloadAction<string>) => {
            state.list = state.list.filter( t => t.id != action.payload);
        },
        updateTransaction: (state , action : PayloadAction<Transaction>) => {
            const index = state.list.findIndex(t => t.id === action.payload.id);
            if(index !== -1) {
                state.list[index] = action.payload;
            }
        },
        setPeriod(state, action: PayloadAction<Period>) {
            state.period = action.payload;
        },
        setFilterType(state, action: PayloadAction<filterType>) {
            state.filter = action.payload;
        },
        setMonthType(state, action: PayloadAction<MonthsFull>) {
            state.selectedMonth = action.payload;
        },
        setSortBy(state, action: PayloadAction<sortType>) {
            state.sortBy = action.payload;
        },
        setSortOrder(state, action: PayloadAction<boolean>) {
            state.sortOrder = action.payload;
        },
    }
})

export const {
    addTransaction,
    deleteTransaction,
    updateTransaction,
    setPeriod,
    setFilterType,
    setSortBy,
    setSortOrder,
    setMonthType,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;