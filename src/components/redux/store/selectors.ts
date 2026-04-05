import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const selectList   = (s: RootState) => s.transactions.list;
const selectFilter = (s: RootState) => s.transactions.filter;
const selectSort   = (s: RootState) => s.transactions.sortBy;
const selectSortOrder = (s: RootState) => s.transactions.sortOrder;

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

export const selectSummary = createSelector([selectFilteredTransactions], (list) => {
    
    const totalIncome   = list.filter((t) => t.type === "income") .reduce((s, t) => s + t.amount, 0);
    const totalExpenses = list.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
});

export const selectTrendData = createSelector([selectList], (list) => {
    const map: Record<string, { month: string; income: number; expense: number }> = {};
    list.forEach((t) => {
        const key = t.date.slice(0, 7);
        if (!map[key]) map[key] = { month: key.slice(5), income: 0, expense: 0 };
        if (t.type === "income") map[key].income += t.amount;
        else                     map[key].expense += t.amount;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
});

export const selectSpendBreakdown = createSelector([selectList], (list) => {
    const expenses = list.filter((t) => t.type === "expense");
    const total    = expenses.reduce((s, t) => s + t.amount, 0);
    const map: Record<string, number> = {};
    expenses.forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => ({
            category,
            amount,
            pct: total ? Math.round((amount / total) * 100) : 0,
        }));
});

export const selectAllCategories = createSelector([selectList], (list) =>
    [...new Set(list.map((t) => t.category))].sort()
);