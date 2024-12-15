"use client"
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SubHeader from '@/components/dashboard/SubHeader'
import { DataTable } from '@/components/global/DataTable'
import LoadingPage from '@/components/global/LoadingPage'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import useCollectionGroup from '@/hooks/UseCollectionGroup'
import { columnInvestment } from '@/lib/utils'
import { InvestmentType } from '@/types/plan'
import React from 'react'







function Investment() {
  
  const [investments, loading] = useCollectionGroup(`investmentDatas`) as readonly [InvestmentType[], boolean, string | null]
 
  if (loading) return <LoadingPage />
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='w-[85%] max-w-full'>
        <DashboardHeader label="Dashboard" />
        <div className="main-gradient !bg-gradient-to-br min-h-screen w-full lg:p-6 p-4 ">
          <SubHeader />
          <DataTable columns={columnInvestment} data={investments} />
          </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Investment