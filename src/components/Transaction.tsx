

import { DropDown } from "./ui-comonents/DropDown"
import { useAppDispatch, useAppSelector } from "./redux/store/hooks";
import { selectSortedTransactions } from "./redux/store/selectors";
import { setFilterType, setSortBy, setSortOrder } from "@/components/redux/slices/transactionsSlice";
import type { RootState } from "./redux/store/store";

type SortField = "date" | "category" | "transaction" | "amount" | "type";

const Days = ["All Time", "Today", "This Week", "This Month", "This Year"];

const SortIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="1.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
);

export const Transaction = () => {


    const dispatch     = useAppDispatch();
    const transactions = useAppSelector(selectSortedTransactions);

    const option    = useAppSelector((s: RootState) => s.transactions.filter);
    const sorting   = useAppSelector((s: RootState) => s.transactions.sortBy);
    const sortOrder = useAppSelector((s: RootState) => s.transactions.sortOrder);

    const handleSort = (field: SortField) => {
        if (sorting === field) {
            dispatch(setSortOrder(!sortOrder));
        } else {
            dispatch(setSortBy(field));
            dispatch(setSortOrder(true));
        }
    };

    const columns: { label: string; field: SortField; align?: string }[] = [
        { label: "Category",    field: "category" },
        { label: "Date",        field: "date" },
        { label: "Transaction", field: "transaction" },
        { label: "Amount",      field: "amount",  align: "justify-end" },
        { label: "Type",        field: "type",    align: "justify-end" },
    ];

    return (
        <div className="bg-white rounded-xl py-4 border min-h-75 border-[#e0eae0] mb-3">
            <div className="flex justify-between px-5 items-center mb-3">
                <span className="text-sm text-black font-medium mb-1">Transaction History</span>
                <div className="flex items-center">
                    <DropDown
                        title="All Time"
                        Option={option}
                        seTOption={(val) => dispatch(setFilterType(val as typeof option))}
                        options={Days}
                    />
                </div>
            </div>

            
            <div className="border-y-2 grid grid-cols-5 font-medium text-gray-500 py-2 px-5 border-gray-200">
                {columns.map(({ label, field, align }) => (
                    <div
                        key={field}
                        onClick={() => handleSort(field)}
                        className={`cursor-pointer hover:text-gray-700 sm:flex-row flex flex-col items-center gap-1 ${align ?? ""}`}
                    >
                        <span>{label}</span>
                        <span className={`transition-transform ${sorting === field && !sortOrder ? "rotate-180" : ""}`}>
                            <SortIcon />
                        </span>
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div>
                {transactions.length === 0 && (
                    <p className="text-center text-sm text-gray-400 py-8">No transactions found.</p>
                )}
                {transactions.map((t, i) => (
                    <div  key={t.id ?? i} className="grid grid-cols-5 px-5 py-3 text-sm items-center hover:bg-gray-50 transition">
                        <span className="font-medium text-gray-800">{t.category}</span>
                        <span className="text-gray-500">{t.date}</span>
                        <span className="text-gray-500">{t.title}</span>
                        <span className="text-right font-medium">{t.amount.toFixed(2)}</span>
                        <div className="flex justify-end">
                            <span className={`border text-sm min-w-12 max-w-24 text-center rounded-xl p-2 font-medium ${
                                t.type === "income"
                                    ? "text-green-600 bg-green-200"
                                    : "text-red-500 bg-red-200"
                            }`}>
                                {t.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};