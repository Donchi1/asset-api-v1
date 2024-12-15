"use client"
import { useGetCurrentUser } from '@/hooks/GetCurrentUser'
import { useAuthStore } from '@/store/authStore'
import React from 'react'
import LoadingPage from './global/LoadingPage'

function UserProvider({ children }: { children: React.ReactNode }) {
    useGetCurrentUser()
    const { loading } = useAuthStore()

    if (loading) return <LoadingPage />

    return (
        <>{children}</>
    )
}

export default UserProvider