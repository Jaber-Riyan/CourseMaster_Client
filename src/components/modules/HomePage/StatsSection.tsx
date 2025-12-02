import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import React from "react";

export default function StatsSection() {
  return (
    <div>
      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Instructors</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
