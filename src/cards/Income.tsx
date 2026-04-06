import { MONTHS, setMonthType, type IncomeType } from "@/redux/slices/transactionsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { selectSummary } from "@/redux/store/selectors";
import type { RootState } from "@/redux/store/store";
import { DropDown } from "@/components/ui-comonents/DropDown";
import type { MonthsFull } from "@/Types/TransactionType";



export const Income = ({earned , salary , Business , Investment} : IncomeType) => {
    const dispatch = useAppDispatch()
    const option = useAppSelector((s: RootState) => s.transactions.selectedMonth);
    const { totalIncome } = useAppSelector(selectSummary)
    
    return (
            
        <div className="dark:border-gray-600 dark:text-white dark:bg-zinc-900 max-w-md border py-3 px-6 border-gray-300 rounded-2xl bg-gray-50  overflow-hidden">

            <div className="flex justify-between">
                <span className="dark:text-gray-400">My Income</span>
                <DropDown
                    title="All Time"
                    Option={option}
                    seTOption={(val) => dispatch(setMonthType(val as MonthsFull))}
                    options={MONTHS}
                />
            </div>
            <div className="flex flex-col gap-2 mb-2">
                <div className="flex flex-col w-full gap-1 mt-8">
                <span className="text-gray-400">Total Income</span>
                <h1 className="text-4xl font-semibold">Rs. {totalIncome.toFixed(2).toString()}</h1>
                <span className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-4xl max-w-1/2">Earned <span className="text-green-400">+{earned.toString()}</span></span>

            </div>
            <div className="flex justify-between gap-2 mt-2">
                <div className="text-sm flex flex-col">
                    <span className="text-gray-400">Salary</span>
                    <span>Rs. {salary.toString()}</span>
                </div>
                <div className="text-sm flex flex-col">
                    <span className="text-gray-400">Business</span>
                    <span>Rs. {Business.toString()}</span>
                </div>
                <div className="text-sm flex flex-col">
                    <span className="text-gray-400">Investment</span>
                    <span>Rs. {Investment.toString()}</span>
                </div>
            </div>
            </div>
        
        </div>
    )
}