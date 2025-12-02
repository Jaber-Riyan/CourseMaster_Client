import TestimonialSection from "@/components/modules/HomePage/TestimonialSection";
import type { ISidebarItem } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardList,
  User,
} from "lucide-react";

export const studentSidebarItems: ISidebarItem = {
  items: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/student/dashboard",
      component: TestimonialSection,
    },
    {
      label: "My Courses",
      icon: BookOpen,
      href: "/student/courses",
      component: TestimonialSection,
    },
    {
      label: "Assignments",
      icon: FileText,
      href: "/student/assignments",
      component: TestimonialSection,
    },
    {
      label: "Quizzes",
      icon: ClipboardList,
      href: "/student/quizzes",
      component: TestimonialSection,
    },
    {
      label: "Profile",
      icon: User,
      href: "/student/profile",
      component: TestimonialSection,
    },
  ],
};
