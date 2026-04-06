import { Transaction } from "@/components/Transaction"
import { DropDown } from "@/components/ui-comonents/DropDown"
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks"
import { setRole } from "@/redux/slices/roleSlice"
import type { RootState } from "@/redux/store/store"
import { useState } from "react"
import type { TransactionType } from "@/Types/TransactionType"
import { addTransaction } from "@/redux/slices/transactionsSlice"
import type { RoleType } from "@/Types/roleType"

export const Roles = [ "admin" , "viewer"]
export const ManageTransaction = () => {

    const dispatch = useAppDispatch()
    const option = useAppSelector( (s : RootState) => s.roles.role)

    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "expense" as TransactionType,
        category: "",
        date: new Date().toISOString().split("T")[0],
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category) return;

    if(option === "viewer") {
        alert("Only Admin can add the Transactiion")
        return;
    }

    dispatch(
      addTransaction({
        title: form.title,
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
      })
    );

    setForm({
      title: "",
      amount: "",
      type: "Expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

    return(
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
            <div className="p-2 flex border-b gap-2 items-center justify-end mr-2">
                
                   <span className="font-semibold">Select Role</span>
                    <DropDown
                        title="All Time"
                        Option={option}
                        seTOption={(val) => dispatch(setRole(val as RoleType))}
                        options={Roles}
                    /> 
                
            </div>

            <div className="m-2 dark:bg-zinc-900 text-black dark:text-white bg-white rounded-xl py-4 border min-h-75 border-[#e0eae0] mb-3">
                <form
                    onSubmit={handleSubmit}
                    className="dark:bg-zinc-900 text-black dark:text-white bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 max-w-md"
                    >
                    <h2 className="text-lg font-semibold">Add Transaction</h2>

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title (e.g. Grocery)"
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        name="amount"
                        type="number"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        className="border rounded-lg px-3 py-2"
                    />

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="bg-white dark:bg-zinc-900 text-black dark:text-white border rounded-lg px-3 py-2"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>

                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category (Food, Salary, etc)"
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                    >
                        Add Transaction
                    </button>
                    </form>
                </div>
                    
            <div className="m-2">
                <Transaction />
            </div>
            
        </div>
    )
}
