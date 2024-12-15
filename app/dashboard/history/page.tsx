"use client"
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SubHeader from '@/components/dashboard/SubHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'
import { DataTable } from '@/components/global/DataTable'
import { HistoryType } from '@/types/table'
import { columns } from '@/lib/utils'
import useCollection from '@/hooks/UseCollection'
import { auth } from '@/db/firebaseConfig'
import LoadingPage from '@/components/global/LoadingPage'


function History() {
  const [history, loading] = useCollection(`transactions/${auth.currentUser?.uid as string}/transactionDatas`) as readonly [HistoryType[], boolean, string | null]

  if(loading) return <LoadingPage />

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader label="Dashboard" />
        <div className="p-6 main-gradient !bg-gradient-to-br min-h-screen">
          <SubHeader />
          <DataTable columns={columns} data={history} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default History