import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mockCourses, mockReviews } from "@/lib/mock-data";
import { Star, Users, Clock, Award, Play } from "lucide-react";
import { Link, useParams } from "react-router";
import { useSingleCourseQuery } from "@/redux/features/Course/course.api";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";
import { useEffect } from "react";

export default function CourseDetailPage() {
  const params = useParams();
  const course = mockCourses.find((c) => c.id === params.id) || mockCourses[0];
  const { data, isLoading } = useSingleCourseQuery(params.id);
  // console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle title="Course Details" />
      <div className="container py-8 flex-1">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                {data?.data?.category.map((c: string) => (
                  <Badge variant={"secondary"}>{c}</Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold">
                {data?.data?.title} -{" "}
                <span className="text-purple-500">{params.batch}</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance">
                {data?.data?.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {params.startDate
                      ? new Date(params.startDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Certificate included</span>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video">
                  <img
                    src={data?.data?.courseBanner || "/placeholder.svg"}
                    alt={data?.data?.title}
                    className="w-full h-48 object-cover p-3 rounded-3xl"
                  />
                </div>
              </CardContent>
            </Card>

            {/* About Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>About the Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold">
                    {data?.data?.instructor.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {data?.data?.instructor}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Expert Instructor
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle>Course Syllabus</CardTitle>
                <CardDescription>Complete curriculum breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {data?.data?.syllabus.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={`item-${item.moduleNumber}`}>
                      <AccordionTrigger className="cursor-pointer">
                        <div className="w-full pr-4">
                          <span>
                            Module {item.moduleNumber} - {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {item?.content &&
                          item?.content.map((content) => (
                            <p className="text-muted-foreground flex gap-2 mb-2 items-center">
                              <Play size={18} />
                              <span>{content.title}</span>
                            </p>
                          ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="font-semibold">
                        {review.studentName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
                <div className="text-3xl font-bold">
                  BDT {data?.data?.price}
                </div>
                <Link to={`/enroll/${data?.data?._id}/${params.batch}`}>
                  <Button className="w-full cursor-pointer font-bold" size="lg">
                    Enroll Now
                  </Button>
                </Link>
                <div className="space-y-2 mt-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">12 weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">Beginner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium">Bangla</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certificate</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Lifetime access</li>
                    <li>✓ 30-day money-back guarantee</li>
                    <li>✓ Certificate of completion</li>
                    <li>✓ Access on mobile and TV</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
