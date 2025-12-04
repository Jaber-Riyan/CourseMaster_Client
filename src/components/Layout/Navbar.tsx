import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggler";
import { Link, useNavigate } from "react-router";
import React from "react";

import {
  useLogoutMutation,
  useUserInfoQuery,
  authApi,
} from "@/redux/features/Auth/auth.api";
import { role } from "@/constants/role";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Loading from "../Loading";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/courses", label: "Courses", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },

  // protected routes
  { href: "/student", label: "Dashboard", role: role.student },
  { href: "/admin", label: "Dashboard", role: role.admin },
];

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { data, isLoading, refetch } = useUserInfoQuery(undefined);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <header
      className={`sticky top-0 z-50 mb-3 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-[0_0_10px_#fff] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300`}>
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-7 w-7" />
          <span className="text-xl font-bold">CourseMaster</span>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => (
              <React.Fragment key={index}>
                {link.role === "PUBLIC" && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="text-muted-foreground hover:text-primary font-medium">
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}

                {link.role === data?.data?.role && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="text-muted-foreground hover:text-primary font-medium">
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />

          {!data?.data?.email && (
            <>
              <Button className="cursor-pointer" asChild variant="outline">
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button className="cursor-pointer" asChild>
                <Link to="/auth/register">Register</Link>
              </Button>
            </>
          )}

          {data?.data?.email && (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="md:hidden size-8" variant="ghost" size="icon">
              ☰
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-48 p-2 md:hidden">
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link, index) => (
                <React.Fragment key={index}>
                  {link.role === "PUBLIC" && (
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to={link.href}>{link.label}</Link>
                    </Button>
                  )}

                  {link.role === data?.data?.role && (
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to={link.href}>{link.label}</Link>
                    </Button>
                  )}
                </React.Fragment>
              ))}

              {!data?.data?.email && (
                <>
                  <Button className="cursor-pointer" asChild>
                    <Link to="/auth/login">Login</Link>
                  </Button>
                  <Button className="cursor-pointer" asChild>
                    <Link to="/auth/register">Register</Link>
                  </Button>
                </>
              )}

              {data?.data?.email && (
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={handleLogout}>
                  Logout
                </Button>
              )}

              <ModeToggle />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
