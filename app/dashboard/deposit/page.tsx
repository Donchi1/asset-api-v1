"use client"
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SubHeader from '@/components/dashboard/SubHeader'
import TradeForm from '@/components/dashboard/TradeForm'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

function Deposit() {
  
  
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader label="Dashboard" />
      <div className="md:p-6 p-4  dash-gradient !bg-gradient-to-br min-h-screen">
        <SubHeader hideBtn="deposit" />
          <TradeForm  />
        </div>
        </SidebarInset>
        </SidebarProvider>
  )
}

export default Deposit