import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggler";
import React from "react";

export function Navbar() {
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

  return (
    <header
      className={`sticky top-0 z-50 mb-3 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-[0_0_10px_#fff] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300`}>
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-7 w-7" />
          <span className="text-xl font-bold">CourseMaster</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/courses">Courses</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">Register</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
