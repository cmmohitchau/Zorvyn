import { Balance } from "../cards/Balance"
import { Expenses } from "../cards/Expenses"
import { Income } from "../cards/Income"
import { Header } from "../components/Header"
import { MoneyFlow } from "../components/MoneyFlow"
import { MoneyTrend } from "../components/MoneyTrend"
import { SpendingBreakDown } from "../components/SpendingBreakDown"
import { Transaction } from "../components/Transaction"
import { AppSidebar } from "../components/app-sidebar"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"

    
    

export const Dashboard = () => {

    return(

        <main className="overflow-y-auto p-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Balance balance={50000} lastIncome={20000} bonus={5000} />
            <Income time="July 24" earned={30000} income={100000} salary={50000} Business={40000} Investment={10000} />
            <Expenses expense={50000} income={100000} earned={30000} />
          </div>

          <div className="w-full mb-4 gap-2 grid grid-cols-1 lg:grid-cols-10">
            <div className="md:col-span-6"><MoneyTrend /></div>
            <div className="col-span-4"> <SpendingBreakDown /> </div>
          </div>

          <div>
            <MoneyFlow />
          </div>

          <div>
            <Transaction />
          </div>

        </main>
    )
}
