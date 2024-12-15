"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

type NavMainType = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
}[]

export function NavMain({ items }: { items: NavMainType }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (

          <SidebarMenuItem key={item.title}>
            <Link href={item.url}>
            <SidebarMenuButton tooltip={item.title}>
              

              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
