import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useAvailableCoursesQuery } from "@/redux/features/Course/course.api";
import { Link } from "react-router";

export default function FeaturedCoursesSection() {
  // console.log(featuredCourses);
  const { data: availableCourses, isLoading } =
    useAvailableCoursesQuery(undefined);
  // console.log(availableCourses?.data?.availableCourses);

  return (
    <div>
      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Available Courses</h2>
            <p className="text-muted-foreground">
              Start learning with our detail curriculum courses
            </p>
          </div>
          {!isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses?.data?.availableCourses &&
                availableCourses?.data?.availableCourses
                  .slice(0, 3)
                  .map((course: any) => (
                    <Card
                      key={course._id}
                      className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover p-3 rounded-3xl"
                      />
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {course?.category.map((c: string) => (
                            <Badge variant={"secondary"}>{c}</Badge>
                          ))}
                        </div>
                        <CardTitle className="line-clamp-2">
                          {course.title} -{" "}
                          <span className="text-purple-500">
                            {course?.upcomingBatches[0]?.name}
                          </span>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">
                              Start Date :{" "}
                              {course?.upcomingBatches?.[0]?.startDate
                                ? new Date(
                                    course.upcomingBatches[0].startDate
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })
                                : ""}
                            </span>
                          </div>
                          <span className="text-lg font-bold">
                            BDT {course.price}
                          </span>
                        </div>
                        <Button className="w-full mt-4" asChild>
                          <Link
                            to={`/course/${course._id}/${course?.upcomingBatches[0]?.name}/${course?.upcomingBatches?.[0]?.startDate}`}>
                            View Course
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          ) : (
            <div className="flex justify-center h-screen items-center">
              <Spinner className="size-10" />
            </div>
          )}

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
