import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Transaction } from "@/Types/TransactionType";
import { MONTHS } from "@/cards/Income";

export const MONTH_MAP : Record<string,number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
    "This Year": 12
}
const CATEGORY_COLORS: Record<string, string> = {
  Housing: "#378ADD",
  Food: "#639922",
  Transport: "#BA7517",
  Shopping: "#7F77DD",
  Utilities: "#FF8C42",
  Health: "#00A86B",
  Entertainment: "#E63946",
  Investment: "#2A9D8F",
  Freelance: "#F4A261",
  Salary: "#264653",
};
const selectList   = (s: RootState) => s.transactions.list;
const selectFilter = (s: RootState) => s.transactions.filter;
const selectSort   = (s: RootState) => s.transactions.sortBy;
const selectSortOrder = (s: RootState) => s.transactions.sortOrder;
const selectMonth = (s : RootState) => s.transactions.selectedMonth;

export const selectRole = (s : RootState) => s.roles.role;

export const selectMonthlyFilteredTransactions = createSelector(
    [selectList, selectMonth] , (list , selectedMonth) => {
        if(!selectedMonth) return list;
        const now = new Date();
        const monthIndex = MONTH_MAP[selectedMonth];
        
        if(monthIndex == 12) {
            return list.filter( (t) => {
                const date = new Date(t.date);
                
                return date.getFullYear() == now.getFullYear();
            })
        }

        return list.filter( (t) => {
            const date = new Date(t.date);
            return date.getMonth() == monthIndex;
        })
    }
)

export const selectFilteredTransactions = createSelector(
    [selectList, selectFilter ],
    (list, option) => {
        const now = new Date();

        return list.filter((t) => {
            if (option === "All Time") return true;
            
            const date = new Date(t.date);

            if (option === "Today") {
                return date.toDateString() === now.toDateString();
            }

            if (option === "This Week") {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                return date >= weekAgo && date <= now;
            }
            
            if (option === "This Month") {
                return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                );
            }

            if (option === "This Year") {
                return date.getFullYear() === now.getFullYear();
            }
        });
    }
);

export const selectSortedTransactions = createSelector(
    [selectFilteredTransactions, selectSort, selectSortOrder],
    (filtered, sorting, sortOrder) => {
        return [...filtered].sort((a, b) => {
            const valA = a[sorting as keyof typeof a];
            const valB = b[sorting as keyof typeof b];

            if (sorting === "date") {
                return sortOrder
                    ? new Date(valA as string).getTime() - new Date(valB as string).getTime()
                    : new Date(valB as string).getTime() - new Date(valA as string).getTime();
            }

            if (sorting === "amount") {
                const A = Number(valA);
                const B = Number(valB);
                return sortOrder ? A - B : B - A;
            }

            return sortOrder
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA));
        });
    }
);

export const selectSummary = createSelector([selectMonthlyFilteredTransactions], (list) => {
    
    const totalIncome   = list.filter((t) => t.type === "Income") .reduce((s, t) => s + t.amount, 0);
    const totalExpenses = list.filter((t) => t.type === "Expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
});

export const selectTrendData = createSelector([selectList], (list) => {
    
    const monthlyBalance = Array(12).fill(0);

    list.forEach( (t : Transaction) => {
        const date = new Date(t.date);
        const month = date.getMonth();

        if(t.type === "Income") {
            monthlyBalance[month] += t.amount;
        } else {
            monthlyBalance[month] -= t.amount;
        }
    });

    return MONTHS.map(( m, i) => ({
        month: m,
        balance: monthlyBalance[i],
    }))
});

export const selectSpendBreakdown = createSelector([selectList], (list) => {
    const expenses = list.filter((t) => t.type === "Expense");
    const total    = expenses.reduce((s, t) => s + t.amount, 0);
    const map: Record<string, number> = {};
    expenses.forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount; });

    return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => ({
            category,
            amount,
            pct: total ? Math.round((amount / total) * 100) : 0,
            color: CATEGORY_COLORS[category] || "#888888"
    }));
});

export const selectAllCategories = createSelector([selectList], (list) =>
    [...new Set(list.map((t) => t.category))].sort()
);


export const selectMoneyFlow = createSelector([selectList] , (list) => {
    const monthlyIncome : number [] = Array(12).fill(0);
    const monthlyExpense : number [] = Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    list.forEach( (t) => {
        const date = new Date(t.date);

        if(date.getFullYear() !== currentYear) return;
        const month = date.getMonth();

        if(t.type === "Income") {
            monthlyIncome[month] += t.amount;
        } else {
            monthlyExpense[month] += t.amount;
        }

    })

    return MONTHS.map(( m, i) => ({
        month: m,
        expense: monthlyExpense[i],
        income: monthlyIncome[i]
    }))
})
