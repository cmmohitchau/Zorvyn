import { SidebarInset, SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Header } from "./components/Header"
import { Outlet } from "react-router-dom";


export const Layout = () => {

    return(
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset >
      <div className="sticky dark:bg-zinc-900 text-black dark:text-white top-0 z-10 bg-gray-100 shrink-0 h-16 items-center ">
        <Header />
      </div>
      
      
      <div className="flex-1 flex flex-col overflow-hidden">
            <Outlet />
      </div>
      </SidebarInset>
    </ SidebarProvider >
    )
}
