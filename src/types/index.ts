import type { LucideProps } from "lucide-react"
import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from "react"
export type { ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}


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

export type TRole = "admin" | "student"

type ZodIssue = {
  code: string
  expected: string
  received: string
  path: string[]
  message: string
}

type ErrorSource = {
  path: string
  message: string
}

export interface IErrorResponse {
  success: boolean
  message: string
  errorSources?: ErrorSource[]
  err?: {
    issues: ZodIssue[]
    name: string
  }
  stack?: string
}