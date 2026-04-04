import { useState } from "react"
import { DropDown } from "./ui-comonents/DropDown"

const transactions = [
  {
    "category": "Food",
    "date": "2026-04-03",
    "transaction": "Lunch at restaurant",
    "amount": 18.5,
    "type": "expense"
  },
  {
    "category": "Transport",
    "date": "2026-04-03",
    "transaction": "Uber ride",
    "amount": 9.2,
    "type": "expense"
  },
  {
    "category": "Salary",
    "date": "2026-04-01",
    "transaction": "Monthly salary",
    "amount": 2200,
    "type": "income"
  },
  {
    "category": "Groceries",
    "date": "2026-04-02",
    "transaction": "Supermarket shopping",
    "amount": 64.3,
    "type": "expense"
  },
  {
    "category": "Entertainment",
    "date": "2026-04-02",
    "transaction": "Netflix subscription",
    "amount": 12.99,
    "type": "expense"
  },
  {
    "category": "Health",
    "date": "2026-04-01",
    "transaction": "Pharmacy purchase",
    "amount": 15.75,
    "type": "expense"
  },
  {
    "category": "Freelance",
    "date": "2026-03-30",
    "transaction": "Website project payment",
    "amount": 500,
    "type": "income"
  },
  {
    "category": "Shopping",
    "date": "2026-03-29",
    "transaction": "Clothes purchase",
    "amount": 85,
    "type": "expense"
  },
  {
    "category": "Utilities",
    "date": "2026-03-28",
    "transaction": "Electricity bill",
    "amount": 45.6,
    "type": "expense"
  },
  {
    "category": "Travel",
    "date": "2026-03-27",
    "transaction": "Train ticket",
    "amount": 30,
    "type": "expense"
  },
    {
    "category": "Travel",
    "date": "2025-03-27",
    "transaction": "Train ticket",
    "amount": 30,
    "type": "expense"
  }
]
type SortField = "date" | "category" | "transaction" | "amount" | "type";

const Days = ["All Transaction" , "Today" , "This Week" , "This Month" , "This Year"];
export const Transaction = () => {

    const [option , setOption] = useState("All Transaction");
    const [sorting , setSorting] = useState<SortField>("date");
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    const now = new Date();

    const filteredTransactins = transactions.filter( (t) => {
        if(option == "All Transaction") return true;

        const date = new Date(t.date);

        if(option === "Today") {
            return date.toDateString() === now.toDateString();
        }

        if(option === "This Week") {
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            return date >= weekAgo && date <= now;
        }

        if(option === "This Month") {
            return(
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            )
        }

        if(option === "This Year") {
            return date.getFullYear() === now.getFullYear();
        }
    })

    const sortedTransactions = [...filteredTransactins].sort( (a , b) => {
        let valA = a[sorting];
        let valB = b[sorting];

        if (sorting === "date") {
            return sortOrder === true
            ? new Date(valA).getTime() - new Date(valB).getTime()
            : new Date(valB).getTime() - new Date(valA).getTime();
        }

        if (sorting === "amount" ) {
            let A = Number(valA)
            let B = Number(valB)
            return sortOrder === true
            ?  A - B
            : B - A;
        }

          return sortOrder === true
    ? String(valA).localeCompare(String(valB))
    : String(valB).localeCompare(String(valA));
    })

    return(
        <div className="bg-white rounded-xl py-4  border min-h-75 border-[#e0eae0] mb-3">
            <div className="flex justify-between px-5 items-center mb-3">
                <span className="text-sm text-black font-medium mb-1">Transaction History</span>
                <div className="flex items-center">
                    <DropDown title="All Transaction" Option={option} seTOption={setOption} options={Days} />
                    <button className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="border-y-2 grid grid-cols-5 font-medium text-gray-500 py-2 px-5 border-gray-200">
                <div onClick={ () => {
                    setSorting("category")
                    setSortOrder(!sortOrder);
                }} className="cursor-pointer hover:text-gray-700 sm:flex-row flex flex-col items-center gap-1">
                    <span>Category</span> 
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    </span>
                </div>
                <div onClick={ () => {
                    setSorting("date")
                    setSortOrder(!sortOrder);
                }} className="cursor-pointer hover:text-gray-700 sm:flex-row flex flex-col items-center gap-1">
                    <span>Date</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    </span>
                </div>
                <div onClick={ () => {
                    setSorting("transaction")
                    setSortOrder(!sortOrder);
                }} className="cursor-pointer hover:text-gray-700 sm:flex-row flex flex-col items-center gap-1">
                    <span>Transaction</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    </span>
                </div>
                <div onClick={ () => {
                    setSorting("amount")
                    setSortOrder(!sortOrder);
                }} className=" cursor-pointer hover:text-gray-700 sm:flex-row flex flex-col justify-end items-center gap-1 text-right">
                    <span className="text-right">Amount</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    </span>
                </div>
                <div onClick={ () => {
                    setSorting("type")
                    setSortOrder(!sortOrder);
                }} className="cursor-pointer justify-end hover:text-gray-700 sm:flex-row sm:items-center flex flex-col items-center gap-1 text-right">
                    <span>Type</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    </span>
                </div>
            </div>
            <div>
                { sortedTransactions.map((m , i) => (
                    <div key={i} className="grid grid-cols-5 px-5 py-3 text-sm items-center hover:bg-gray-50 transition">
                        <span className="font-medium text-gray-800">{m.category}</span>
                        <span className="text-gray-500">{m.date}</span>
                        <span className="text-gray-500">{m.transaction}</span>
                        <span className="text-right font-medium">{m.amount.toFixed(2)}</span>
                        <div className="flex justify-end">
                            <span className={` border text-sm min-w-12 max-w-24 text-center rounded-xl p-2 font-medium ${
                            m.type === "income" ? "text-green-600 bg-green-200" : "text-red-500 bg-red-200"

                        }`}>{m.type}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}