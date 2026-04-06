import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { setMonthType, type MonthsFull } from "@/redux/slices/transactionsSlice";
import type { RootState } from "@/redux/store/store";
import { DropDown } from "@/components/ui-comonents/DropDown";
import { MONTHS } from "./Income";
import { selectSummary } from "@/redux/store/selectors";


export const Balance = () => {
        const dispatch = useAppDispatch();

        const option = useAppSelector((s: RootState) => s.transactions.selectedMonth);
        
        const { balance } = useAppSelector(selectSummary)
        
    
    return (
        <div className="dark:text-white dark:bg-zinc-900 max-w-md border py-3 px-6 border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50  overflow-hidden">
            <div className="flex justify-between">
                
                <span className="dark:text-gray-400">My Balance</span>
                <DropDown
                    title="All Time"
                    Option={option}
                    seTOption={(val) => dispatch(setMonthType(val as MonthsFull))}
                    options={MONTHS}
                />
            </div>
            <div className="flex flex-col w-full gap-2 mt-8">
                <span className="text-gray-400">Total balance</span>
                <h1 className="text-4xl font-semibold">Rs. {balance.toFixed(2).toString()}</h1>
                
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <span className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-4xl max-w-4/5">Total earned last time <span className="text-green-400">+{600000}</span></span>
                <span className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-4xl max-w-1/2">Total bonus <span className="text-green-400">+{20000}</span></span>
            </div>
        </div>
    )
}