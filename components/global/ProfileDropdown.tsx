import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ChevronsUpDown, Home, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { usePathname } from 'next/navigation'
import { handleLogout } from '@/lib/actions'




const userLinks = [
  {
    href: "/dashboard/profile",
    label: "Profile"
  },
  {
    href: "/dashboard/notification",
    label: "Notifications"
  }
]
const adminLinks = [
  {
    href: "/admin/dashboard/profile",
    label: "Profile"
  },
  {
    href: "/admin/dashboard/notification",
    label: "Notifications"
  }
]


function ProfileDropdown() {

  const { currentUser } = useAuthStore()
  const pathname = usePathname()

  const links = pathname.includes("admin") ? adminLinks : userLinks

  return (
    <DropdownMenu >
      <DropdownMenuTrigger className='flex items-center gap-2 focus:outline-none active:outline-none px-2 py-1 border-none shadow shadow-primary-gray/10 rounded-xl bg-primary-blue/30'>

        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={currentUser?.photo} alt={currentUser?.fullname} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-white  text-sm leading-tight">
          <span className="truncate text-xs">Welcome</span>
          <span className="truncate font-semibold">{currentUser?.fullname}</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4 text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 bg-sidebar text-primary-light border-none shadow shadow-primary-gray/20 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          {pathname.includes("dashboard") ? links.map((link) => (
            <Link href={link.href} key={link.href} >
              <DropdownMenuItem>
                {link.label}
              </DropdownMenuItem>
            </Link>
          )) : <Link href={"/dashboard"} >
            <DropdownMenuItem>
              <Home />
              Dashboard
            </DropdownMenuItem>
          </Link>}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}> 
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown