import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const menu = [
  { name: "Dashboard", icon: "🏠" },
  { name: "Transactions", icon: "💳" },
  { name: "Analytics", icon: "📊" },
  { name: "Settings", icon: "⚙️" },
];

interface props {
    open : boolean;
    setOpen : (key : boolean) => void
}

export const Sidebar = ({open , setOpen} : props) => {
  const [active, setActive] = useState("Dashboard");

    
  return (
    <>
    
      <aside className={`
          fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-300 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          fixed translate-x-0 shrink-0
        `}>
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        <span className="text-white font-semibold">Finance App</span>

        {/* Close button (only when open) */}
        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded hover:bg-gray-800"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

        <div className="px-6 py-5 text-white text-lg font-semibold border-b border-gray-800">
        Finance App
      </div>
      
      <div className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
              active === item.name
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>

      
      <div className="p-4 border-t border-gray-800 text-sm">
        <div className="text-gray-400">Logged in as</div>
        <div className="text-white font-medium">John Doe</div>
      </div>
      </aside>
    </>
  );
};