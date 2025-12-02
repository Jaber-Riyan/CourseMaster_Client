import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, FileText, ClipboardList, User, LogOut, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./Layout/ModeToggler"
import { Link, useLocation } from "react-router"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/student/dashboard",
  },
  {
    label: "My Courses",
    icon: BookOpen,
    href: "/student/courses",
  },
  {
    label: "Assignments",
    icon: FileText,
    href: "/student/assignments",
  },
  {
    label: "Quizzes",
    icon: ClipboardList,
    href: "/student/quizzes",
  },
  {
    label: "Profile",
    icon: User,
    href: "/student/profile",
  },
]

export function StudentSidebar() {
  const pathname = useLocation()

  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-6 border-b">
        <Link to="/student/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="h-7 w-7" />
          <span className="text-xl font-bold">CourseMaster</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Student Portal</p>
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.pathname === route.href
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
          <Link to="/">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
