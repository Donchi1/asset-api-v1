"use client"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { ReferralLink } from "@/components/dashboard/ReferrerLink"
import { StatsCards } from "@/components/dashboard/StatCards"
import SubHeader from "@/components/dashboard/SubHeader"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import {  referralLinkInfo, referralStats } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"
import { DocumentData } from "firebase/firestore"

export default function DashboardPage() {
  const {currentUser} = useAuthStore()

  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader label="Dashboard" />
      <div className="md:p-6 p-4 main-gradient !bg-gradient-to-br min-h-screen">
        <SubHeader />
      <main>
        <ReferralLink data={referralLinkInfo(currentUser as DocumentData)} />
        <StatsCards stats={referralStats(currentUser)} />
      </main>
    </div>
    </SidebarInset>
    </SidebarProvider>
  )
}

