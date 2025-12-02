import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItem) => {
  return sidebarItems.items.map((route) => ({
    path: route.href,
    Component: route.component,
  }));
};
