"use client"
import { AppSidebar } from '@/components/app-sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ProfileInfoCard from '@/components/dashboard/ProfileInfoCard'
import ProfileSettingsForm from '@/components/dashboard/ProfileSettingsForm'
import SubHeader from '@/components/dashboard/SubHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useAuthStore } from '@/store/authStore'
import React from 'react'

function Profile() {

  const {currentUser} = useAuthStore()

  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader label="Dashboard" />
      <div className="p-6 main-gradient !bg-gradient-to-br min-h-screen">
        <SubHeader />
        <div className='grid grid-cols-1 md:grid-cols-5  gap-8'>
            <ProfileSettingsForm user={currentUser} isAdmin={true}/>
            <ProfileInfoCard user={currentUser}/>
          </div>
        </div>
        </SidebarInset>
        </SidebarProvider>
  )
}

export default Profile