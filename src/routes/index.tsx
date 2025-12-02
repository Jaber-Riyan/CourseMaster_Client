import App from "@/App";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { role } from "@/constants/role";
import HomePage from "@/pages/HomePage";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { studentSidebarItems } from "./studentSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import CoursePlayerPage from "@/pages/CoursePlayerPage";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        element: "This is the contact us page",
        path: "contact",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.student as TRole),
    path: "/student",
    children: [
      { index: true, element: <Navigate to={"/student/dashboard"} /> },
      { element: <CoursePlayerPage/>, path: "/student/course/:id/player" },
      ...generateRoutes(studentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={"/admin/dashboard"} /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
]);
