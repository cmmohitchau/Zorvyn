import { createSlice ,type PayloadAction } from "@reduxjs/toolkit";
import { type filterType, type MonthsFull, type Period, type sortType, type Transaction } from "@/Types/TransactionType";

interface TransactionState {
    list : Transaction[];
    period : Period;
    filter : filterType;
    selectedMonth : MonthsFull
    sortBy : sortType;
    sortOrder: boolean;
}

const SEED_TRANSACTIONS: Transaction[] = [
  
  { id: "t1", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-01-01" },
  { id: "t2", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-01-03" },

  { id: "t3", title: "Freelance", amount: 1500, type: "Income", category: "Freelance", date: "2026-02-05" },
  { id: "t4", title: "Groceries", amount: 800, type: "Expense", category: "Food", date: "2026-02-07" },
  { id: "t25", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-02-01" },
  { id: "t26", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-02-03" }, 

  
  { id: "t5", title: "Salary", amount: 5200, type: "Income", category: "Salary", date: "2026-03-01" },
  { id: "t6", title: "Electric Bill", amount: 600, type: "Expense", category: "Utilities", date: "2026-03-10" },
  { id: "t27", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-03-01" },
  { id: "t28", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-03-03"},

  { id: "t7", title: "Investment Return", amount: 6000, type: "Income", category: "Investment", date: "2026-04-08" },
  { id: "t8", title: "Shopping", amount: 900, type: "Expense", category: "Shopping", date: "2026-04-12" },
    { id: "t29", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-04-01" },
  { id: "t30", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-04-03" },

  { id: "t9", title: "Salary", amount: 5300, type: "Income", category: "Salary", date: "2026-05-01" },
  { id: "t10", title: "Dining", amount: 700, type: "Expense", category: "Food", date: "2026-05-15" },
    { id: "t31", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-05-01" },
  { id: "t32", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-05-03" },

  { id: "t11", title: "Freelance", amount: 2000, type: "Income", category: "Freelance", date: "2026-06-04" },
  { id: "t12", title: "Netflix", amount: 500, type: "Expense", category: "Entertainment", date: "2026-06-06" },
    { id: "t33", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-06-01" },
  { id: "t34", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-06-03" },

  { id: "t13", title: "Salary", amount: 5400, type: "Income", category: "Salary", date: "2026-07-01" },
  { id: "t14", title: "Travel", amount: 1500, type: "Expense", category: "Transport", date: "2026-07-20" },
    { id: "t35", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-07-01" },
  { id: "t36", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-07-03" },

  { id: "t15", title: "Dividends", amount: 1800, type: "Income", category: "Investment", date: "2026-08-03" },
  { id: "t16", title: "Groceries", amount: 850, type: "Expense", category: "Food", date: "2026-08-09" },
    { id: "t37", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-08-01" },
  { id: "t38", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-08-03" },

  { id: "t17", title: "Salary", amount: 5500, type: "Income", category: "Salary", date: "2026-09-01" },
  { id: "t18", title: "Gym", amount: 600, type: "Expense", category: "Health", date: "2026-09-11" },
    { id: "t39", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-09-01" },
  { id: "t40", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-09-03" },

  { id: "t19", title: "Freelance", amount: 1700, type: "Income", category: "Freelance", date: "2026-10-05" },
  { id: "t20", title: "Shopping", amount: 6000, type: "Expense", category: "Shopping", date: "2026-10-18" },
  { id: "t41", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-10-01" },
  { id: "t42", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-10-03" },

  { id: "t21", title: "Salary", amount: 5600, type: "Income", category: "Salary", date: "2026-11-01" },
  { id: "t22", title: "Medical", amount: 900, type: "Expense", category: "Health", date: "2026-11-14" },
  { id: "t43", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-11-01" },
  { id: "t44", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-11-03" },

  { id: "t23", title: "Bonus", amount: 3000, type: "Income", category: "Salary", date: "2026-12-20" },
  { id: "t24", title: "Gifts", amount: 1500, type: "Expense", category: "Shopping", date: "2026-12-25" },
  { id: "t43", title: "Salary", amount: 50000, type: "Income", category: "Salary", date: "2026-12-20" },
  { id: "t44", title: "Rent", amount: 6000, type: "Expense", category: "Housing", date: "2026-12-03" },
];


const basestate: TransactionState = {
    list : SEED_TRANSACTIONS,
    period: "Monthly",
    filter: "All Time",
    sortBy : "date",
    sortOrder: false,
    selectedMonth: "Jan"
}

const loadState = (): TransactionState => {
  try {
    const serializedState = localStorage.getItem("transactionsState");
    if (!serializedState) return basestate;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load state", e);
    return initialState;
  }
};


const initialState: TransactionState = loadState() || basestate;

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

export type IncomeType = {
    time : string;
    income : Number;
    earned : Number; 
    salary : Number;
    Business : Number;
    Investment : Number;
}

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "This Year"
];