import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import PageTitle from "@/components/PageTitle";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <PageTitle title="Not Found"/>
      <div className="text-center space-y-6 max-w-md mx-auto">
        <h1 className="text-7xl font-extrabold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          Oops! The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>

        <Button asChild className="mt-4">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
