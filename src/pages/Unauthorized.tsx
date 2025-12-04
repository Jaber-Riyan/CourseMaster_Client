import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import PageTitle from "@/components/PageTitle";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <PageTitle title="Unauthorized" />
      <div className="text-center space-y-6 max-w-md mx-auto">
        <Lock className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-3xl font-bold">Unauthorized Access</h1>
        <p className="text-muted-foreground">
          You do not have permission to view this page. Please login with proper
          credentials or return to home.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row justify-center mt-4">
          <Button asChild variant="default">
            <Link to="/">Go Home</Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
