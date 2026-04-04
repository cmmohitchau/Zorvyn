import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Zorvyn from "@/assets/zorvynlogolight.png";
import { House , ChartNoAxesCombined , FileChartLine, CreditCard , Bell , Pencil } from 'lucide-react';
import { IconHelp, IconSearch, IconSettings } from "@tabler/icons-react";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  user : {
    name : "Mohit Chaudhary",
    email : "cmmohitchau@gmail.com",
    avatar : "https://avatars.githubusercontent.com/u/134165344?v=4"
  },
  navMain: [
    {
      title: "MENU",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon : <House size={18} className="text-muted-foreground" />
        },
        {
          title: "Analytics",
          url: "/analytics",
          icon : <ChartNoAxesCombined size={18} className="text-muted-foreground" />
        },
        {
          title: "Edit",
          url: "/manage",
          icon : <Pencil size={18} className="text-muted-foreground" />
        },
        {
          title : "Transactions",
          url : "/transaction",
          icon : <FileChartLine size={18} className="text-muted-foreground" />
        },
        {
          title : "Card",
          url : "#",
          icon : <CreditCard size={18} className="text-muted-foreground" />
        },
        {
          title : "Notifications",
          url : "#",
          icon : <Bell size={18} className="text-muted-foreground" />
        } 

      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex justify-start gap-2">
          <a href="/"> <img className="h-8 w-8" src={Zorvyn} alt="icon" />  </a>
          <h1 className="text-2xl font-bold">Zorvyn</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton  asChild isActive={item.isActive}>
                      
                      <a className="flex items-center gap-2" href={item.url}>
                        {item.icon}
                        {item.title}
                        </a>
                      
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
