import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router";
import { ModeToggle } from "./Layout/ModeToggler";
import { Button } from "./ui/button";
import { GraduationCap, Home, LogOut } from "lucide-react";
import { getSidebarItems } from "@/utils/getSidebarItems";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/Auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import Loading from "./Loading";

export default function AppSidebar() {
  const location = useLocation();
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  // const routes = studentSidebarItems;
  const routes = getSidebarItems(userData?.data?.role);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();

      dispatch(authApi.util.resetApiState());

      toast.info("Logged out");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-6 border-b">
        <Link to="/student/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="h-7 w-7" />
          <span className="text-xl font-bold">CourseMaster</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Student Portal</p>
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === "/"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}>
            <Home className="h-5 w-5" />
            Home
          </Link>
          {routes.items.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === route.href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}>
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t space-y-2">
        <div className="flex justify-center">
          <ModeToggle />
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start cursor-pointer"
          asChild>
          <div>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </div>
        </Button>
      </div>
    </div>
  );
}
