import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { SidebarTrigger } from '../ui/sidebar'
import { usePathname, useRouter } from 'next/navigation'
import ProfileDropdown from '../global/ProfileDropdown'

function DashboardHeader({label}:{label: string}) {
  const router = useRouter()
  const pathname = usePathname()
  const current = pathname?.split("/").at(-1)


  return (
    <header className="flex justify-between h-16 !bg-gradient-to-br main-gradient shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-white" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {label !== "home" && <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className='text-primary-light hover:text-primary/60' onClick={() => router.back()}>
                    {label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-primary-light capitalize'>{current}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>}
          </div>
          <div className='mr-4'>
         <ProfileDropdown />
        </div>
        </header>
  )
}

export default DashboardHeader