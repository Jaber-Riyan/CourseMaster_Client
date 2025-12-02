import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-1 text-sm">
              Welcome to CourseMaster
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Learn Anything, Anytime
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              Master new skills with expert instructors. Join thousands of
              students learning on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-bold" asChild>
                <Link to="/courses">
                  Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" className="font-bold" variant="outline" asChild>
                <Link to="/auth/signup">Start Learning Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
