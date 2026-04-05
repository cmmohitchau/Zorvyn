import { Transaction } from "@/components/Transaction"
import { DropDown } from "@/components/ui-comonents/DropDown"
import { useAppDispatch, useAppSelector } from "@/components/redux/store/hooks"
import { setRole, type Role } from "@/components/redux/slices/roleSlice"
import type { RootState } from "@/components/redux/store/store"
import { useEffect, useState } from "react"
import type { TransactionType } from "@/Types/TransactionType"
import { addTransaction } from "@/components/redux/slices/transactionsSlice"
import { IconFlagPlus } from "@tabler/icons-react"

export const Roles = [ "admin" , "viewer"]
export const ManageTransaction = () => {

    const dispatch = useAppDispatch()
    const option = useAppSelector( (s : RootState) => s.roles.role)
    const [error , setError ] = useState<boolean>(false);

    useEffect( () =>{
        setError(false);
    }, [option])

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
        setError(true);
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
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

    return(
        <div className="">
            <div className="p-2 flex border-b items-center justify-end mr-2">
                
                   <span className="font-semibold">Select Role</span>
                    <DropDown
                        title="All Time"
                        Option={option}
                        seTOption={(val) => dispatch(setRole(val as Role))}
                        options={Roles}
                    /> 
                
            </div>

            <div className="m-2 bg-white rounded-xl py-4 border min-h-75 border-[#e0eae0] mb-3">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 max-w-md"
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
                        className="border rounded-lg px-3 py-2"
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

                    {error && <p className="text-xl text-red-500">Only Admin can add the transaction</p>}

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
