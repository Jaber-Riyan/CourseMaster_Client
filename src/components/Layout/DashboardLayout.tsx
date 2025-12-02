import { Outlet } from "react-router"
import AppSidebar from "../app-sidebar"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 shrink-0 hidden md:block">
        <AppSidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  )
}
