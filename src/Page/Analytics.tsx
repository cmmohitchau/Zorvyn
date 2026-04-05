import { MoneyFlow } from "@/components/MoneyFlow"
import { MoneyTrend } from "@/components/MoneyTrend"
import { SpendingBreakDown } from "@/components/SpendingBreakDown"


export const Analytics = () => {
    return(
        <div className="m-2">
        <div className="w-full mb-4 gap-2 grid grid-cols-1 lg:grid-cols-10 items-stretch">
            <div className="md:col-span-6 h-full"><MoneyTrend /></div>
            <div className="col-span-4 h-full"> <SpendingBreakDown /> </div>
        </div>
        
        <div>
        <MoneyFlow />
        </div>
        </div>
    )
}