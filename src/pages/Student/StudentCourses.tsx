import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockEnrolledCourses } from "@/lib/mock-data";
import { Star } from "lucide-react";
import { Link } from "react-router";
import { useEnrollmentUserQuery } from "@/redux/features/Enrollment/enrollment.api";
import Loading from "@/components/Loading";

export default function StudentCoursesPage() {
  const { data: enrollmentData, isLoading: enrollmentDataIsLoading } =
    useEnrollmentUserQuery(undefined);

  console.log(enrollmentData);

  if (enrollmentDataIsLoading) return <Loading />;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground">
          Manage and continue your enrolled courses
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {enrollmentData?.data?.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <img
              src={course.courseId.thumbnail || "/placeholder.svg"}
              alt={course.courseId.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {
                  course?.courseId?.category.map((category)=><Badge variant="secondary">{category}</Badge>)
                }
                <Badge>{course.progress}% Complete</Badge>
              </div>
              <CardTitle>{course.courseId.title}</CardTitle>
              <CardDescription>{course.courseId.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.6</span>
                </div>
                <span className="text-muted-foreground">
                  By {course.courseId.instructor}
                </span>
              </div>

              <div className="">
                <Button className="w-full" asChild>
                  <Link to={`/student/course/${course.courseId._id}/${course._id}/player`}>
                    Continue Learning
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <h3 className="text-xl font-semibold mb-2">Explore More Courses</h3>
          <p className="text-muted-foreground mb-4">
            Discover new skills and expand your knowledge
          </p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
