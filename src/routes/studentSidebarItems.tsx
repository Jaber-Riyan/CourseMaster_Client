import type { ISidebarItem } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardList,
  User,
} from "lucide-react";
import { lazy } from "react";

const Dashboard = lazy(()=>import("@/pages/Student/StudentDashboard"))
const Courses = lazy(()=>import("@/pages/Student/StudentCourses"))
const Assignments = lazy(()=>import("@/pages/Student/StudentAssignments"))
const Quizzes = lazy(()=>import("@/pages/Student/StudentQuizzes"))
const Profile = lazy(()=>import("@/pages/Student/StudentProfile"))

export const studentSidebarItems: ISidebarItem = {
  items: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/student/dashboard",
      component: Dashboard,
    },
    {
      label: "My Courses",
      icon: BookOpen,
      href: "/student/courses",
      component: Courses,
    },
    {
      label: "Assignments",
      icon: FileText,
      href: "/student/assignments",
      component: Assignments,
    },
    {
      label: "Quizzes",
      icon: ClipboardList,
      href: "/student/quizzes",
      component: Quizzes,
    },
    {
      label: "Profile",
      icon: User,
      href: "/student/profile",
      component: Profile,
    },
  ],
};
