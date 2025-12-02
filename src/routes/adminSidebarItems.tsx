import type { ISidebarItem } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Users,
  FileCheck,
  Settings,
  
} from "lucide-react";
import { lazy } from "react";

const PageSettings = lazy(()=>import("@/pages/Admin/AdminSettings"))
const Enrollments = lazy(()=>import("@/pages/Admin/AdminEnrollments"))
const Dashboard = lazy(()=>import("@/pages/Admin/AdminDashboard"))
const ManageCourses = lazy(()=>import("@/pages/Admin/AdminManageCourses"))
const ManageBatches = lazy(()=>import("@/pages/Admin/AdminManageBatches"))
const AssignmentsReviews = lazy(()=>import("@/pages/Admin/AdminAssignments"))

export const adminSidebarItems: ISidebarItem = {
  items: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      component: Dashboard
    },
    {
      label: "Manage Courses",
      icon: BookOpen,
      href: "/admin/courses",
      component: ManageCourses
    },
    {
      label: "Manage Batches",
      icon: Layers,
      href: "/admin/batches",
      component: ManageBatches
    },
    {
      label: "Enrollments",
      icon: Users,
      href: "/admin/enrollments",
      component: Enrollments
    },
    {
      label: "Assignment Review",
      icon: FileCheck,
      href: "/admin/assignments",
      component: AssignmentsReviews
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      component: PageSettings
    }
  ]
};

