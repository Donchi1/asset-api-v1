import React from 'react'
import { LinkButton } from '../ui/button'
import { usePathname } from 'next/navigation'

function SubHeader({hideBtn=""}:{hideBtn?: string}) {

  const pathname = usePathname()
  const title = pathname?.split("/").at(-1)

  const isAdmin = !pathname?.includes("admin")

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="lg:text-2xl text-xl font-bold text-white capitalize">{title}</h1>
      <div className="flex lg:gap-4 gap-2  *:transition-all ease-linear [&_button]:hover:bg-primary [&_button]:text-primary-blue ">
        {isAdmin && hideBtn !== "deposit" && <LinkButton label='Add fund' link={"/dashboard/deposit"}/>}
        {isAdmin && hideBtn !== "withdrawal" && <LinkButton  label='Withdrawal' link={"/dashboard/withdrawal"}/>}
      </div>
    </div>  
  )
}

export default SubHeader