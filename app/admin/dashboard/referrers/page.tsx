"use client"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { StatsCards } from "@/components/dashboard/StatCards"
import SubHeader from "@/components/dashboard/SubHeader"
import LoadingPage from "@/components/global/LoadingPage"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import useCollection from "@/hooks/UseCollection"
import {   referralStats } from "@/lib/utils"

export default function DashboardPage() {
  const [users, loading] = useCollection("users")

  const allUserStats = users.length > 0 ? users?.map(each => referralStats(each)): []
   
  const total = {
    totalReferrals: allUserStats.reduce((acc, init) => acc + init.totalReferrals,0),
    unpaidReferrals:  allUserStats.reduce((acc, init) => acc + init.unpaidReferrals,0),
    totalCommission: allUserStats.reduce((acc, init) => acc + init.totalCommission,0),
    refAmount: 30
  }

  if(loading) return <LoadingPage />
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader label="Dashboard" />
      <div className="md:p-6 p-4 main-gradient !bg-gradient-to-br min-h-screen">
        <SubHeader />
      <main>
        {/* <ReferralLink data={referralLinkInfo(currentUser as DocumentData)} /> */}
        <StatsCards stats={total} />
      </main>
    </div>
    </SidebarInset>
    </SidebarProvider>
  )
}

