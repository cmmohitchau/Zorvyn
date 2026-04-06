
import { useTheme } from "@/hooks/use-theme";
import { Profile } from "./Profile";
import { SidebarTrigger } from "./ui/sidebar";

export const Header = () => {

    const { theme , toggleTheme } = useTheme();
    
    return(
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white flex justify-between w-full">
            
            <div className="flex gap-2 ml-2 mt-2">
                <SidebarTrigger className="" />
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-black dark:text-white">Dashboard</span>
                    <span className="hidden md:block text-sm text-gray-400 dark:text-gray-200">Keep Track, Assess, and Enhance Your Financial Performance</span>
                </div>
            </div>
            <div className="flex justify-between gap-2 mr-4 mt-2">
                <span onClick={toggleTheme} className="border flex justify-center items-center rounded-full w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                </span>
                <span onClick={ () => {
                    alert("Send The Report")
                }} className="border flex justify-center items-center rounded-full w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>

                </span>
                <Profile username={"Mohit Chaudhary"} email={"cmmohichau@gmail.com"} />

            </div>
        </div>
    )
}