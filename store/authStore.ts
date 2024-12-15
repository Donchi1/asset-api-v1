
import { UserDataType } from "@/types/table"
import { DocumentData } from "firebase/firestore"
import {create} from "zustand"


export type UserType =  UserDataType | null | undefined


interface AppStateType {
    currentUser: UserType
    loading: boolean
    error: any

    setCurrentUser: (user:UserType) => void
    setLoading: (loading: boolean) => void
    setError: (error: any) => void
}


export const useAuthStore = create<AppStateType>((set) => ({
    currentUser: null,
    loading: true,
    error: null,

     //state updates
    setCurrentUser: (user) => set((state) => ({
       currentUser: user
    })),
    setLoading: (loading) => set((state) => ({
        loading:loading
     })),
     setError: (error) => set(() => ({
        error
     }))
}))