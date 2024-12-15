"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function SidebarBrand() {


  return (
    <SidebarMenu>
      <SidebarMenuItem>

        <SidebarMenuButton

          size="lg"
          className="data-[state=open]:bg-sidebar-accent hover:bg-transparent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex items-center gap-2 ">
            <Image
              src="/images/logo.png"
              alt="Asset-api Logo"
              width={50}
              height={50}
              className="rounded-full w-[30px]"
            />
            <h3 className="!text-sm font-bold uppercase text-primary-light">Asset-Api</h3>
          </div>
        </SidebarMenuButton>

      </SidebarMenuItem>
    </SidebarMenu>
  )
}
