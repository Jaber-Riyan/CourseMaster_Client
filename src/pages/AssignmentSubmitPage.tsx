"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router";
import { useGetAssignmentQuery } from "@/redux/features/Course/course.api";
import Loading from "@/components/Loading";
import { useSubmitAssignmentMutation } from "@/redux/features/Enrollment/enrollment.api";
import { toast } from "sonner";

const assignmentSchema = z.object({
  answer: z.string().min(1, "Answer is required"),
});

type AssignmentFormType = z.infer<typeof assignmentSchema>;

const AssignmentPage = () => {
  const { enrollmentId, courseId, moduleId, submitted, mark } = useParams();

  const navigate = useNavigate();
  const { data: getAssignmentData, isLoading } = useGetAssignmentQuery({
    courseId,
    moduleId,
  });
  const [submitAssignmentMutation] = useSubmitAssignmentMutation();
  //   console.log(enrollmentId, courseId, moduleId)

  const form = useForm<AssignmentFormType>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = async (values: AssignmentFormType) => {
    const assignmentSubmitInfo = {
      enrollmentId,
      moduleId: Number(moduleId),
      answer: values.answer,
    };
    console.log("Assignment Submitted:", assignmentSubmitInfo);

    let toastId;
    try {
      toastId = toast.loading("Submitting...");
      const result = await submitAssignmentMutation(
        assignmentSubmitInfo
      ).unwrap();
      console.log(result);
      if (result.success) {
        form.reset();
        toast.success(result.message, { id: toastId });
        return navigate(-1);
      } else if (!result.success) {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        toast.error(error.data?.message, { id: toastId });
        return navigate(-1);
      }
    }
  };

  if (isLoading) return <Loading />;
  //   console.log(getAssignmentData.data);

  return (
    <div className="w-full min-h-screen text-white py-16 px-6">
      <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 shadow-2xl space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Assignment Submission
          </h2>
          <p className="text-slate-300">
            Complete the task below and submit your answer.
          </p>
        </div>

        {submitted && submitted === "true" ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              {Number(mark) > 0
                ? "Assignment Reviewed"
                : "Assignment Submitted"}
            </h2>
            {Number(mark) > 0 && (
              <h2 className="text-2xl p-3">
                After Review Assignment Mark : {mark}
              </h2>
            )}
            <p>After Reviewed Mark Will have Displayed here & module page!!</p>
          </div>
        ) : (
          <>
            {/* Assignment Display */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-6 space-y-4 hover:bg-white/10 transition-all">
              <p className="text-lg">
                <span className="font-semibold text-emerald-300">
                  Requirement:
                </span>{" "}
                {getAssignmentData?.data?.assignment?.requirement}
              </p>

              <p className="text-lg">
                <span className="font-semibold text-emerald-300">Message:</span>{" "}
                {getAssignmentData?.data?.assignment?.message}
              </p>
            </div>

            {/* FORM */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                {/* Answer Field */}
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200 text-lg">
                        Your Answer
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter GitHub repo link..."
                          {...field}
                          className="w-full bg-white/5 border border-white/20 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full text-lg font-semibold py-6 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 transition cursor-pointer">
                  Submit Assignment 🚀
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignmentPage;
