"use client"

import * as React from "react"
import {
  Banknote,
  Bell,
  Group,
  HandCoins,
  History,
  Home,
  Landmark,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarBrand } from "./sidebar-brand"
import useGetDocument from "@/hooks/UseDocument"
import { auth } from "@/db/firebaseConfig"
import LoadingPage from "./global/LoadingPage"
import { useAuthStore } from "@/store/authStore"
import { usePathname } from "next/navigation"


// This is sample data.
const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      
    },
    {
      title: "Wallet",
      url: "/dashboard/wallet",
      icon: Wallet,
      isActive: false
    },
    {
      title: "Funding",
      url: "/dashboard/deposit",
      icon: Landmark,
      isActive: false
    },
    {
      title: "Withdrawal",
      url: "/dashboard/withdrawal",
      icon: Banknote,
     isActive: false
    },
    {
      title: "Investment",
      url: "/dashboard/investment",
      icon: HandCoins,
      isActive: false
    },
    {
      title: "Notification",
      url: "/dashboard/notification",
      icon: Bell,
      isActive: false
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: History,
      isActive: false
    },
    {
      title: "Referrer",
      url: "/dashboard/referrer",
      icon: Users,
      isActive: false
    },
  ]
const navMainAdmin = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
      isActive: true,
      
    },
    {
      title: "Users",
      url: "/admin/dashboard/users",
      icon: UsersRound,
      isActive: false
    },
    {
      title: "Transactions",
      url: "/admin/dashboard/transactions",
      icon: Landmark,
      isActive: false
    },
    {
      title: "Investments",
      url: "/admin/dashboard/investments",
      icon: HandCoins,
      isActive: false
    },
    {
      title: "Notification",
      url: "/admin/dashboard/notification",
      icon: Bell,
      isActive: false
    },
    {
      title: "Referrers",
      url: "/admin/dashboard/referrers",
      icon: Group,
      isActive: false
    },
  ]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, loading] = useGetDocument("users", auth.currentUser?.uid as string, {snap: true, user: true})
  const {currentUser} = useAuthStore()

  const isAdmin = usePathname().includes("admin")

  
  if(loading) return <LoadingPage />

  return (
    <Sidebar className="!bg-gradient-to-br main-gradient !text-white" collapsible="icon" {...props}>
    
      <SidebarHeader>
        <SidebarBrand  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={isAdmin? navMainAdmin : navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
