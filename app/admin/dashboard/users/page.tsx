"use client"
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SubHeader from '@/components/dashboard/SubHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'
import useCollection from '@/hooks/UseCollection'
import { columnUsers} from '@/lib/utils'
import LoadingPage from '@/components/global/LoadingPage'
import { DataTable } from '@/components/global/DataTable'



function Users() {

  const [users, usersLoading] = useCollection(`users`)

console.log(users)
if(usersLoading) return <LoadingPage />
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='w-[85%] max-w-full'>
        <DashboardHeader label="Dashboard" />
        <div className="md:p-5 p-4 main-gradient !bg-gradient-to-br min-h-screen">
          <SubHeader hideBtn='dashboard' />
        <DataTable columns={columnUsers as any} data={users} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Users


