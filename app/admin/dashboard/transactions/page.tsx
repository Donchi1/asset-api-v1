"use client"
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SubHeader from '@/components/dashboard/SubHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'
import { DataTable } from '@/components/global/DataTable'
import { HistoryType } from '@/types/table'
import { columnHistory } from '@/lib/utils'
import LoadingPage from '@/components/global/LoadingPage'
import useCollectionGroup from '@/hooks/UseCollectionGroup'


function History() {

  const [transactions, loading] = useCollectionGroup(`transactionDatas`) as readonly [HistoryType[], boolean, string | null]

  if(loading) return <LoadingPage />


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='w-[85%] max-w-full'>
        <DashboardHeader label="Dashboard" />
        <div className="md:p-6 main-gradient !bg-gradient-to-br min-h-screen w-full lg:p-6 p-4">
          <SubHeader />
          <DataTable  columns={columnHistory} data={transactions} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default History