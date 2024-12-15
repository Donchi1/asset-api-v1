"use server"
import { cookies } from "next/headers";

 
export async function createCookie(name:string, data: string, date?: number) {
  const newDate = date ? date : 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    (await cookies()).set(name, data, {expires: Date.now() + newDate})
  }

  
  export async function destroyCookie(data: string) {
    (await cookies()).delete(data)
  }


  export async function getSessionData() {
    const encryptedSessionData = (await cookies()).get('auth')?.value
    return encryptedSessionData ? JSON.parse(encryptedSessionData) : null
  }

  