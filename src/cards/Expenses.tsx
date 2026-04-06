import { useAppDispatch, useAppSelector } from "@/components/redux/store/hooks";
import type { RootState } from "@/components/redux/store/store";
import { DropDown } from "@/components/ui-comonents/DropDown";
import { MONTHS } from "./Income";
import type { MonthsFull } from "@/components/redux/slices/transactionsSlice";
import { setMonthType } from "@/components/redux/slices/transactionsSlice"
import { selectSummary } from "@/components/redux/store/selectors";


type expenseType = {
    expense : number;
    earned : number;
    income : number;
}
export const Expenses = () => {
    const dispatch = useAppDispatch();

    const { totalExpenses , totalIncome } = useAppSelector(selectSummary)

    
    const option    = useAppSelector((s: RootState) => s.transactions.selectedMonth);
    let progress : number = (totalExpenses / totalIncome);
    const totalBars = 30;

    return (
        <div className="dark:border-gray-600 dark:text-white dark:bg-zinc-900 max-w-md border py-3 px-6 border-gray-300 rounded-2xl bg-gray-50  overflow-hidden">

            <div className="flex justify-between">
                
                <span className="dark:text-gray-400">With a goal of 75%</span>
                <DropDown
                    title="All Time"
                    Option={option}
                    seTOption={(val) => dispatch(setMonthType(val as MonthsFull))}
                    options={MONTHS}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col w-full gap-1 mt-8">
                    <span className="text-gray-400">Total expense</span>
                    <h1 className="text-4xl font-semibold">Rs. {totalExpenses.toFixed(2).toString()}</h1>

                    <span className="px-2 py-1 text-sm bg-gray-200 rounded-4xl max-w-1/2 dark:bg-gray-600 dark:text-gray-200">Earned <span className="text-green-400">+{4000}</span></span>
                </div>
                <div className="flex gap-1 my-4">
                    {[...Array(totalBars)].map((_, i) => {
                        const filled = i < totalBars * progress;
                        return (
                        <div
                            key={i}
                            className={`w-2 h-10 rounded-full ${
                            filled ? "bg-lime-400" : "bg-lime-100"
                            }`}
                        />
                        );
                    })}
                </div>
            </div>
            
        
        </div>
    )
}