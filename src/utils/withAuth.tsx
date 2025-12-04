import Loading from "@/components/Loading";
import { useUserInfoQuery } from "@/redux/features/Auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function authWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    console.log(data?.data?.role, isLoading, requiredRole);

    if (isLoading) {
      return <Loading />;
    }

    if (!data?.data?.email) {
      toast.info("Your are Not Login Yet!!");
      return <Navigate to={"/auth/login"} replace />;
    }

    if (
      requiredRole &&
      requiredRole.toLowerCase() !== data?.data?.role.toString()
    ) {
      return <Navigate to={"/unauthorized"} />;
    }
    console.log("Inside The With Auth Higher Order Component ", data);
    return <Component />;
  };
};
