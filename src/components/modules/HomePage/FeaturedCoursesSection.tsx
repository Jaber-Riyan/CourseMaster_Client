import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCourses } from "@/lib/mock-data";
import { Star } from "lucide-react";
import { Link } from "react-router";

export default function FeaturedCoursesSection() {
  const featuredCourses = mockCourses.slice(0, 3);
  console.log(featuredCourses)

  return (
    <div>
      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <p className="text-muted-foreground">
              Start learning with our most popular courses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={"secondary"}>{course.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({course.studentsEnrolled.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-lg font-bold">${course.price}</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link to={`/course/${course.id}`}>View Course</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
