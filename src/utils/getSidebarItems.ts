import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { studentSidebarItems } from "@/routes/studentSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.admin:
            return adminSidebarItems

        case role.student:
            return studentSidebarItems

        default:
            return { items: [] }
    }
}