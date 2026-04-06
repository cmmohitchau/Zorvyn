import { useState, useRef, useEffect } from "react";

interface DropDownProps {
  title: string;
  options: string[];
  seTOption : (value : string) => void;
  Option : string | null;
}

export const DropDown = ({ options , seTOption , Option}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      // remove seTOption(title) from here entirely
      const handleClickOutside = (e: MouseEvent) => {
          if (!dropdownRef.current?.contains(e.target as Node)) {
              setOpen(false);
          }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="bg-white dark:bg-zinc-900 text-black dark:text-white relative inline-block text-left">

      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" dark:bg-zinc-600 dark:text-white inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black hover:bg-white/20"
      >
        {Option}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`-mr-1 size-5  text-black  transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 top-full w-56 max-h-60 overflow-y-auto scroll-smooth rounded-md bg-gray-200 dark:text-white shadow-lg ring-1 ring-white/10">
          <div className="py-1 pb-6 bg-white dark:bg-zinc-600 text-black dark:text-white">
            {options.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  seTOption(option)
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-black/5 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-zinc-600 dark:text-white"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};