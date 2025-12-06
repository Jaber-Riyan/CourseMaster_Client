"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useGetQuizQuery } from "@/redux/features/Course/course.api";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { useSubmitQuizMutation } from "@/redux/features/Enrollment/enrollment.api";

export default function QuizSubmitPage() {
  const {
    enrollmentId,
    courseId,
    moduleId,
    submitted: submittedQuizStatus,
    mark,
  } = useParams();
  const { data: quizData, isLoading } = useGetQuizQuery({ courseId, moduleId });
  const [submitQuizMutation] = useSubmitQuizMutation();
  const { handleSubmit, setValue, watch } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  const quiz = {
    questions: [...quizData.data.quiz.questions],
  };

  const answers = watch();
  const allAnswered =
    Object.keys(answers).length === quiz.questions.length &&
    Object.values(answers).every((v) => v !== "");

  const correctCount = quiz.questions.filter(
    (q, index) => answers[`q${index}`] === q.correctAnswer
  ).length;

  const score = Math.round((correctCount / quiz.questions.length) * 100);

  const onSubmit = async () => {
    const submitQuizInfo = {
      enrollmentId,
      moduleId,
      score: correctCount,
    };

    console.log(submitQuizInfo);

    let toastId;
    try {
      toastId = toast.loading("Submitting....");
      const result = await submitQuizMutation(submitQuizInfo).unwrap();
      console.log(result);
      if (result.success) {
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
    setSubmitted(true);
  };

  console.log(quizData?.data?.quiz?.questions);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
        {/* Heading */}
        <div className="space-y-1 flex flex-col items-center mb-3">
          {" "}
          <h1 className="text-4xl font-bold">🔥 Take the Quiz</h1>{" "}
          <p className="text-muted-foreground">
            {" "}
            Select your answers & submit to see your score{" "}
          </p>{" "}
        </div>

        {/* Form */}
        {submittedQuizStatus && submittedQuizStatus == "true" && (
          <Card className="p-6 text-center border-primary shadow-lg">
            <CardContent className="space-y-3">
              <h2 className="text-3xl font-bold">Quiz Completed!</h2>
              <p className="text-5xl font-black text-primary">
                {Math.round((Number(mark) / quiz.questions.length) * 100)}%
              </p>
              <p className="text-muted-foreground">
                You got {mark} of {quiz.questions.length} correct
              </p>
            </CardContent>
          </Card>
        )}

        {submittedQuizStatus && submittedQuizStatus == "false" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="shadow-xl border border-slate-200 dark:border-slate-800 backdrop-blur-lg bg-white/60 dark:bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Fundamentals Test
                </CardTitle>
                <CardDescription>
                  {quiz.questions.length} Multiple-Choice Questions
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {quiz.questions.map((q, index) => {
                  const selected = answers[`q${index}`];

                  return (
                    <div
                      key={index}
                      className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                      <p className="font-semibold mb-4 text-lg">
                        {index + 1}. {q.question}
                      </p>

                      <RadioGroup
                        onValueChange={(value) =>
                          setValue(`q${index}`, value, {
                            shouldValidate: true,
                          })
                        }
                        disabled={submitted}
                        className="space-y-3">
                        {q.options.map((option, i) => {
                          const correct = option === q.correctAnswer;
                          const wrong =
                            option === selected && option !== q.correctAnswer;

                          return (
                            <div
                              key={i}
                              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all 
                              ${
                                submitted && correct
                                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                                  : submitted && wrong
                                  ? "border-red-500 bg-red-50 dark:bg-red-900"
                                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}>
                              <RadioGroupItem
                                value={option}
                                id={`q${index}-${i}`}
                              />
                              <Label
                                htmlFor={`q${index}-${i}`}
                                className="flex-1 cursor-pointer">
                                {option}
                              </Label>

                              {submitted && correct && (
                                <CheckCircle2 className="text-green-500" />
                              )}
                              {submitted && wrong && (
                                <XCircle className="text-red-500" />
                              )}
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </div>
                  );
                })}

                {!submitted ? (
                  <Button
                    type="submit"
                    className="w-full text-lg font-semibold"
                    disabled={!allAnswered}>
                    🚀 Submit Answers
                  </Button>
                ) : (
                  <Card className="p-6 text-center border-primary shadow-lg">
                    <CardContent className="space-y-3">
                      <h2 className="text-3xl font-bold">Quiz Completed!</h2>
                      <p className="text-5xl font-black text-primary">
                        {score}%
                      </p>
                      <p className="text-muted-foreground">
                        You got {correctCount} of {quiz.questions.length}{" "}
                        correct
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}
