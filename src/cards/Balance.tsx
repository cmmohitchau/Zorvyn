
type BalanceType = {
    balance : Number,
    lastIncome : Number,
    bonus : Number

}

export const Balance = ({balance  , lastIncome , bonus } : BalanceType) => {
    return (
        <div className="max-w-md border py-3 px-6 border-gray-300 rounded-2xl bg-gray-50  overflow-hidden">
            <div className="flex justify-between">
                <span>My Balance</span>
                <span>All time</span>
            </div>
            <div className="flex flex-col w-full gap-2 mt-8">
                <span className="text-gray-400">Total balance</span>
                <h1 className="text-4xl font-semibold">Rs. {balance.toFixed(2).toString()}</h1>
                <span className="px-2 py-1 text-sm bg-gray-200 rounded-4xl max-w-4/5">Total earned last time <span className="text-green-400">+{lastIncome.toString()}</span></span>
                <span className="px-2 py-1 text-sm bg-gray-200 rounded-4xl max-w-1/2">Total bonus <span className="text-green-400">+{bonus.toString()}</span></span>
            </div>
        </div>
    )
}