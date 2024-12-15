"use client"
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ProfileInfoCard from '@/components/dashboard/ProfileInfoCard'
import ProfileSettingsForm from '@/components/dashboard/ProfileSettingsForm'
import SubHeader from '@/components/dashboard/SubHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import useGetDocument from '@/hooks/UseDocument'
import React from 'react'
import { useParams } from 'next/navigation'
import { UserDataType } from '@/types/table'
import LoadingPage from '@/components/global/LoadingPage'

function Profile() {

  const { uid } = useParams();

  const [userForEdit, userForEditLoading] = useGetDocument('users', uid as string, { snap: true }) as readonly [UserDataType | null | undefined, boolean, string | null]


  if(userForEditLoading) return <LoadingPage />

  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader label="Dashboard" />
      <div className="p-6 main-gradient !bg-gradient-to-br min-h-screen">
        <SubHeader />
        <div className='grid grid-cols-1 md:grid-cols-5  gap-8'>
            <ProfileSettingsForm user={ userForEdit} />
            <ProfileInfoCard action={true} user={userForEdit}/>
          </div>
        </div>
        </SidebarInset>
        </SidebarProvider>
  )
}

export default Profile