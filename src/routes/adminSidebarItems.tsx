import TestimonialSection from "@/components/modules/HomePage/TestimonialSection";
import type { ISidebarItem } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Users,
  FileCheck,
  Settings
} from "lucide-react";

export const adminSidebarItems: ISidebarItem = {
  items: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      component: TestimonialSection
    },
    {
      label: "Manage Courses",
      icon: BookOpen,
      href: "/admin/courses",
      component: TestimonialSection
    },
    {
      label: "Manage Batches",
      icon: Layers,
      href: "/admin/batches",
      component: TestimonialSection
    },
    {
      label: "Enrollments",
      icon: Users,
      href: "/admin/enrollments",
      component: TestimonialSection
    },
    {
      label: "Assignment Review",
      icon: FileCheck,
      href: "/admin/assignments",
      component: TestimonialSection
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      component: TestimonialSection
    }
  ]
};

