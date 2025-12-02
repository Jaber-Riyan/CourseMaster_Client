import type { LucideProps } from "lucide-react"
import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from "react"

export interface ISidebarItem {
  items: {
    label: string;
    href: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    component: ComponentType;
  }[];
}

export type TRole = "ADMIN" | "STUDENT"