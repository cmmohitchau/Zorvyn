import { Balance } from "./cards/Balance"
import { Expenses } from "./cards/Expenses"
import { Income } from "./cards/Income"
import { Header } from "./components/Header"
import { MoneyFlow } from "./components/MoneyFlow"
import { MoneyTrend } from "./components/MoneyTrend"
import { Sidebar } from "./components/Sidebar"
import { SpendingBreakDown } from "./components/SpendingBreakDown"
import { Transaction } from "./components/Transaction"
import { useState } from "react"
import { Menu } from "lucide-react";

function App() {

  const [open , setOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      
      <Sidebar open={open} setOpen={setOpen} />


      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-neutral-800">
        
          {!open && (
            <button
              onClick={() => setOpen(true)}
              className="m-2 p-2 rounded hover:bg-neutral-800"
            >
              <Menu size={20} />
            </button>
          )}

          <Header />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full m-2 flex flex-col gap-4 md:flex-row justify-center ">
            <Balance balance={50000} lastIncome={20000} bonus={5000} />
            <Income time="July 24" earned={30000} income={100000} salary={50000} Business={40000} Investment={10000} />
            <Expenses expense={50000} income={100000} earned={30000} />
          </div>

          <div className="w-full m-2 gap-2 grid grid-cols-1 md:grid-cols-10">
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
        
      </div>
    </div>

  )
}

export default App

