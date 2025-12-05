import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddCourseModuleMutation,
  useAdminAllCoursesQuery,
} from "@/redux/features/Course/course.api";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";

const syllabusContentSchema = z.object({
  title: z.string().min(1, "Content title required"),
  videoUrl: z.string().url("Invalid video URL"),
  completed: z.boolean().optional().default(false),
});

const quizQuestionSchema = z.object({
  question: z.string().min(1, "Question required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .length(4, "Must provide 4 options"),
  correctAnswer: z.string().min(1, "Correct answer required"),
});

const quizSchema = z.object({
  questions: z.array(quizQuestionSchema),
});

const assignmentSchema = z.object({
  requirement: z.string().min(1, "Assignment requirement required"),
  message: z.string().min(1, "Assignment message required"),
});

const addModuleSchema = z.object({
  courseId: z.string().min(1, "Select a course"),
  title: z.string().min(1, "Module title required"),
  content: z.array(syllabusContentSchema),
  quiz: quizSchema.optional(),
  assignment: assignmentSchema.optional(),
});

export default function ModuleForm() {
  const { data: adminAllCourses, isLoading } =
    useAdminAllCoursesQuery(undefined);

  const [addCourseModuleMutation] = useAddCourseModuleMutation();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }, // ⭐ ERROR object
  } = useForm({
    resolver: zodResolver(addModuleSchema),
    defaultValues: {
      courseId: "",
      title: "",
      content: [
        {
          title: "",
          videoUrl: "",
          completed: false,
        },
      ],
      quiz: {
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
          },
        ],
      },
      assignment: {
        requirement: "",
        message: "",
      },
    },
  });

  const {
    fields: contentFields,
    append: addContent,
    remove: removeContent,
  } = useFieldArray({
    control,
    name: "content",
  });

  const {
    fields: quizFields,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "quiz.questions",
  });

  const onSubmit = async (data: any) => {
    let toastId;
    try {
      toastId = toast.loading("Module Adding...");
      const result = await addCourseModuleMutation(data).unwrap();

      if (result.success) {
        reset();
        return toast.success(result.message, { id: toastId });
      } else {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data?.message, { id: toastId });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form
      className="space-y-6 p-5 border-2 rounded-2xl"
      onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-semibold">Add Course Module</h2>
      <Separator className="p-1 my-3 bg-white/40" />
      {/* Select Course */}
      <div>
        <label className="block font-semibold mb-1">Select Course</label>

        <Select onValueChange={(value) => setValue("courseId", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a course" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Courses</SelectLabel>
              {adminAllCourses?.data?.map((course) => (
                <SelectItem key={course._id} value={course._id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.courseId && (
          <p className="text-red-500 text-sm">
            {errors.courseId.message as string}
          </p>
        )}
      </div>

      {/* Module title */}
      <div>
        <label className="font-bold">Module Title</label>
        <Input {...register("title")} placeholder="Enter module title" />

        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Content Section */}
      <div className="border p-4 rounded">
        <h2 className="font-bold mb-3">Content</h2>

        {contentFields.map((item, index) => (
          <div key={item.id} className="flex gap-4 mb-3 border p-3 rounded">
            <div className="w-full">
              <Input
                {...register(`content.${index}.title`)}
                placeholder="Content title"
              />
              {errors.content?.[index]?.title && (
                <p className="text-red-500 text-sm">
                  {errors.content[index].title?.message as string}
                </p>
              )}
            </div>

            <div className="w-full">
              <Input
                {...register(`content.${index}.videoUrl`)}
                placeholder="YouTube Embed Video URL"
              />
              {errors.content?.[index]?.videoUrl && (
                <p className="text-red-500 text-sm">
                  {errors.content[index].videoUrl?.message as string}
                </p>
              )}
            </div>

            <Button
              type="button"
              className="text-red-500 font-semibold"
              onClick={() => removeContent(index)}>
              <Trash />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          className="bg-green-600 text-white p-2 rounded"
          onClick={() =>
            addContent({ title: "", videoUrl: "", completed: false })
          }>
          <Plus /> Add Content
        </Button>
      </div>

      {/* Quiz section */}
      <div className="border p-4 rounded">
        <h2 className="font-bold mb-3">Quiz Questions</h2>

        {quizFields.map((item, index) => (
          <div key={item.id} className="border p-4 rounded mb-4">
            <h2 className="font-bold mb-3">Question {index + 1}</h2>
            <Input
              {...register(`quiz.questions.${index}.question`)}
              placeholder="Question"
            />
            {errors.quiz?.questions?.[index]?.question && (
              <p className="text-red-500 text-sm">
                {errors.quiz.questions[index].question?.message as string}
              </p>
            )}

            <Separator className="p-1 my-3 bg-white/40" />

            <h2 className="font-bold mb-3">Options</h2>
            {Array.from({ length: 4 }).map((_, optIndex) => (
              <div key={optIndex}>
                <Input
                  {...register(`quiz.questions.${index}.options.${optIndex}`)}
                  placeholder={`Option ${optIndex + 1}`}
                />

                {errors.quiz?.questions?.[index]?.options?.[optIndex] && (
                  <p className="text-red-500 text-sm">
                    {
                      errors.quiz.questions[index].options?.[optIndex]
                        ?.message as string
                    }
                  </p>
                )}
              </div>
            ))}

            <Separator className="p-1 my-3 bg-white/40" />

            <h2 className="font-bold mb-3">Correct Answer</h2>
            <Input
              {...register(`quiz.questions.${index}.correctAnswer`)}
              placeholder="Correct Answer"
            />
            {errors.quiz?.questions?.[index]?.correctAnswer && (
              <p className="text-red-500 text-sm">
                {errors.quiz.questions[index].correctAnswer?.message as string}
              </p>
            )}

            <Button
              type="button"
              className="mt-2 text-red-500 font-semibold"
              onClick={() => removeQuestion(index)}>
              <Trash />
              Remove Question {index + 1}
            </Button>
          </div>
        ))}

        <Button
          type="button"
          className="bg-green-600 text-white p-2 rounded"
          onClick={() =>
            addQuestion({
              question: "",
              options: ["", "", "", ""],
              correctAnswer: "",
            })
          }>
          + Add Quiz Question
        </Button>
      </div>

      {/* Assignment */}
      <div className="border p-4 rounded">
        <h2 className="font-bold mb-3">Assignment</h2>
        <Input
          {...register("assignment.requirement")}
          placeholder="Requirement, Doc or PDF Link"
        />
        {errors.assignment?.requirement && (
          <p className="text-red-500 text-sm">
            {errors.assignment.requirement.message}
          </p>
        )}

        <Separator className="p-1 my-3 bg-white/40" />
        <Textarea {...register("assignment.message")} placeholder="Message" />
        {errors.assignment?.message && (
          <p className="text-red-500 text-sm">
            {errors.assignment.message.message}
          </p>
        )}
      </div>

      <Button type="submit" className="bg-blue-600 text-white p-3 rounded">
        Add Course Module
      </Button>
    </form>
  );
}
