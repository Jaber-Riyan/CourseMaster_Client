import { useUserInfoQuery } from "@/redux/features/Auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";

export const authPageBlock = (Component: ComponentType) => {
  return function authPageBlockWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    // console.log(data?.data?.role, isLoading);

    if (!isLoading && data?.data?.email) {
      toast.info("Your are Already Logged In!!");
      return <Navigate to={`/`} />;
    }

    console.log("Inside The Auth Page Block Higher Order Component ", data);
    return <Component />;
  };
};
