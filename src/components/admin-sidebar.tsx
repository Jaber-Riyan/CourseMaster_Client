"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, Users, FileCheck, Settings, LogOut, Shield, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "./Layout/ModeToggler"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Manage Courses",
    icon: BookOpen,
    href: "/admin/courses",
  },
  {
    label: "Manage Batches",
    icon: Layers,
    href: "/admin/batches",
  },
  {
    label: "Enrollments",
    icon: Users,
    href: "/admin/enrollments",
  },
  {
    label: "Assignment Review",
    icon: FileCheck,
    href: "/admin/assignments",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-6 border-b">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <Shield className="h-7 w-7 text-destructive" />
          <span className="text-xl font-bold">CourseMaster</span>
        </Link>
        <Badge variant="destructive" className="mt-2">
          Admin Portal
        </Badge>
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === route.href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t space-y-2">
        <div className="flex justify-center">
          <ModeToggle />
        </div>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
