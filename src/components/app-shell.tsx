"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building,
  CalendarDays,
  LayoutDashboard,
  Mail,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/students", label: "Students", icon: Users },
  { href: "/companies", label: "Companies", icon: Building },
  { href: "/email", label: "Email Tool", icon: Mail },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-r border-sidebar-border"
        >
          <SidebarContent>
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-primary"
                  fill="currentColor"
                >
                  <path d="M12 2L1 9l4 1.5V17h2v-6h2v6h2v-6h2v6h2V10.5L23 9z" />
                </svg>
                <span
                  className={cn(
                    "font-headline text-2xl font-semibold text-sidebar-foreground",
                    "group-data-[collapsible=icon]:hidden"
                  )}
                >
                  CampusConnect
                </span>
              </Link>
            </SidebarHeader>
            <SidebarMenu className="p-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    as={Link}
                    href={item.href}
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
            <MobileSidebarTrigger />
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

function MobileSidebarTrigger() {
  const { isMobile } = useSidebar()
  if (!isMobile) return null
  return <SidebarTrigger className="md:hidden" />
}
