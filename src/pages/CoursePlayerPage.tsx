import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageTitle from "@/components/PageTitle";
import { syllabus } from "@/lib/mock-data";
import { Book, Check, FileQuestion, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router";
import { useSingleCourseQuery } from "@/redux/features/Course/course.api";
import { useUserInfoQuery } from "@/redux/features/Auth/auth.api";
import Loading from "@/components/Loading";
import {
  useEnrollmentProgressQuery,
  useMarkAsCompleteMutation,
} from "@/redux/features/Enrollment/enrollment.api";
import { toast } from "sonner";

export default function CoursePlayerPage() {
  const params = useParams();
  // User Details
  const { data: userData, isLoading: userIsLoading } =
    useUserInfoQuery(undefined);

  // Get Single Course
  const { data: singleCourse, isLoading: singleCourseIsLoading } =
    useSingleCourseQuery(params.id);

  const { data: enrollmentProgress, isLoading: enrollmentProgressIsLoading } =
    useEnrollmentProgressQuery(params.enrollmentId);

  const [currentLesson, setCurrentLesson] = useState<any>(null);

  // Mark As Complete Lesson Mutation
  const [markAsCompleteMutation] = useMarkAsCompleteMutation();

  // Course Progress
  const courseProgress = userData?.data?.progress?.find(
    (item) => item.courseId === params.id
  );

  // Course Total Lessons
  const totalLessons = enrollmentProgress?.data?.totalLessonsPerCourse?.find(
    (item) => item.courseId === params.id
  );

  // Course Complete Lessons
  const completeLessons =
    enrollmentProgress?.data?.completeTotalLessonsPerCourse?.find(
      (item) => item.courseId === params.id
    );

  // Handler Mark As Complete
  const handleMarkAsComplete = async () => {
    const toastId = toast.loading("Loading...");

    const markAsCompleteInfo = {
      courseId: params.id,
      batch: courseProgress.batch,
      moduleId: currentLesson.moduleNumber,
      lessonId: currentLesson.lessonNumber,
      enrollmentId: params.enrollmentId,
    };

    try {
      console.log(markAsCompleteInfo);
      const result = await markAsCompleteMutation(markAsCompleteInfo).unwrap();
      console.log(result);
      if (result.success) return toast.success(result.message, { id: toastId });
      if (!result.success) {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        toast.error(error.data?.message, { id: toastId });
      }
    }
  };

  // When data ready → update default lesson
  useEffect(() => {
    if (!singleCourseIsLoading) {
      const firstLesson = singleCourse?.data?.syllabus?.[0]?.content?.[0];
      const modifiedLesson = {
        ...firstLesson,
        moduleNumber: singleCourse?.data?.syllabus?.[0].moduleNumber,
        lessonNumber: 1,
      };
      setCurrentLesson(modifiedLesson ?? null);
    }
  }, [singleCourseIsLoading, singleCourse]);

  if (userIsLoading || singleCourseIsLoading || enrollmentProgressIsLoading)
    return <Loading />;

  // console.log(singleCourse?.data);
  // console.log(currentLesson);
  // console.log(userData.data);
  // console.log(enrollmentProgress.data);
  // console.log(currentLesson);
  console.log(singleCourse?.data?.syllabus);
  console.log(courseProgress);

  return (
    <div className="flex lg:flex-col h-screen mb-20 p-10">
      <PageTitle title="Course Player" />
      {/* Progress Bar */}{" "}
      <div className="border-b p-4 bg-background">
        {" "}
        <div className="container flex items-center gap-4">
          {" "}
          <div className="flex-1">
            {" "}
            <Progress
              value={courseProgress?.overallPercentage}
              className="h-2"
            />{" "}
          </div>{" "}
          <span className="text-sm font-medium">
            {" "}
            {completeLessons?.totalLessons} / {totalLessons?.totalLessons}{" "}
            lessons completed{" "}
          </span>{" "}
          <Badge>{courseProgress.overallPercentage}%</Badge>{" "}
        </div>{" "}
      </div>
      <div className="flex flex-1 overflow-hidden border p-2 rounded-2xl">
        {/* === VIDEO PLAYER === */}
        <div className="flex-1 flex flex-col bg-black">
          <iframe
            src={currentLesson?.videoUrl}
            title={currentLesson?.title}
            className="w-full h-full"
            allowFullScreen
          />
          <div className="mt-6">
            <Button
              onClick={handleMarkAsComplete}
              size="lg"
              className="cursor-pointer bg-green-500 text-white">
              <Check className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </div>
        </div>

        {/* === MODULE DRAWER SIDEBAR === */}
        <div className="w-96 border-l overflow-y-auto bg-background border-2 p-4">
          <h2 className="font-bold text-lg mb-4">Course Content</h2>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {singleCourse?.data?.syllabus?.map((module, i) => (
              <AccordionItem
                key={i}
                value={`module-${i + 1}`}
                className="border rounded-md">
                <AccordionTrigger className="px-4 py-2 font-semibold cursor-pointer border">
                  Module {module.moduleNumber} - {module.title}
                </AccordionTrigger>

                <AccordionContent className="pl-4 space-y-2">
                  {module.content.map((lesson, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        setCurrentLesson({
                          ...lesson,
                          moduleNumber: module.moduleNumber,
                          lessonNumber: index + 1,
                        })
                      }
                      className={`cursor-pointer p-3 rounded-md border flex items-center gap-3 ${
                        courseProgress?.modules[i]?.lessons[index]?.complete ===
                        true
                          ? "bg-green-500"
                          : currentLesson?.title === lesson.title &&
                            "bg-accent border-primary"
                      }`}>
                      <div className="shrink-0">
                        {currentLesson?.title === lesson.title ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium">{lesson.title}</p>
                      </div>
                    </div>
                  ))}
                  {singleCourse?.data?.syllabus[i].assignment && (
                    <Button
                      variant={"link"}
                      className="cursor-pointer w-full flex justify-start bg-accent p-6">
                      <Link
                        className="cursor-pointer flex justify-start items-center gap-2"
                        to={"/"}>
                        <Book /> <span>Assignment</span>
                      </Link>
                    </Button>
                  )}
                  {singleCourse?.data?.syllabus[i].quiz && (
                    <Button
                      variant={"link"}
                      className="cursor-pointer w-full flex justify-start bg-accent p-6">
                      <Link
                        className="cursor-pointer flex justify-start items-center gap-2"
                        to={"/"}>
                        <FileQuestion /> <span>Quiz</span>
                      </Link>
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
