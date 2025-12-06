"use client";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ExternalLink } from "lucide-react";
import {
  useGetPendingAssignmentQuery,
  useReviewAssignmentMutation,
} from "@/redux/features/Enrollment/enrollment.api";
import { useForm } from "react-hook-form";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminAssignmentsPage() {
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const {
    data: pendingAssignmentsData,
    isLoading,
    refetch,
  } = useGetPendingAssignmentQuery({
    courseId: selectedCourseId,
  });

  if (isLoading) return <Loading />;

  const assignments = pendingAssignmentsData?.data ?? [];

  return (
    <div className="p-8 space-y-8 w-full overflow-x-hidden">
      <div>
        <h1 className="text-3xl font-bold">Assignment Review</h1>
        <p className="text-muted-foreground">
          Review and grade student submissions
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Submitted Assignments</CardTitle>
          <CardDescription>
            Total: {assignments.length} submissions
          </CardDescription>
        </CardHeader>
        {!assignments.length && (
          <h2 className="ml-7 text-white/70">
            No Available Assignment For Review
          </h2>
        )}
        {assignments.length > 0 && (
          <CardContent className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment: any, index: number) => (
                  <TableRow key={index}>
                    {/* Student */}
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {assignment.student.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {assignment.student.email}
                        </div>
                      </div>
                    </TableCell>

                    {/* Assignment */}
                    <TableCell className="max-w-xs truncate">
                      Assignment {assignment.moduleId}
                    </TableCell>

                    {/* Course */}
                    <TableCell>{assignment.course.title}</TableCell>

                    {/* Batch  */}
                    <TableCell>{assignment.batch}</TableCell>

                    {/* Status */}
                    <TableCell>
                      {assignment.reviewed ? (
                        <Badge className="bg-green-500">Reviewed</Badge>
                      ) : (
                        <Badge className="bg-yellow-500">Pending</Badge>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <ReviewDialog assignment={assignment} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

/* ------------------------
   Dialog Component
-------------------------*/

function ReviewDialog({ assignment }: any) {
  const [reviewAssignmentMutation] = useReviewAssignmentMutation();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      mark: "",
    },
  });

  const onSubmit = async (data: any) => {
    const assignmentReviewInfo = {
      enrollmentId: assignment.enrollmentId,
      moduleId: assignment.moduleId,
      mark: Number(data.mark),
    };
    console.log(assignmentReviewInfo);

    let toastId;
    try {
      toastId = toast.loading("Reviewing...");
      const result = await reviewAssignmentMutation(
        assignmentReviewInfo
      ).unwrap();
      console.log(result);
      if (result.success) {
        reset();
        return toast.success(result.message, { id: toastId });
      } else if (!result.success) {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        return toast.error(error.data?.message, { id: toastId });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="font-semibold bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          size="sm">
          Review
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Review Assignment</DialogTitle>
          <DialogDescription>
            Assignment {assignment.moduleId} — {assignment.student.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Student Information</p>
            <div className="text-sm text-muted-foreground">
              <p>Name: {assignment.student.name}</p>
              <p>Email: {assignment.student.email}</p>
              <p>Course: {assignment.course.title}</p>
              <p>Batch: {assignment.batch}</p>
            </div>
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Assignment Answer</p>
            <div className="p-3 border rounded-md text-sm bg-muted">
              {assignment.answer}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mark</label>
              <input
                {...register("mark", {
                  required: "Mark is required",
                  validate: (v) => (Number(v) >= 0 ? true : "Invalid mark"),
                })}
                placeholder="Enter mark"
                className="w-full border rounded-md px-3 py-2"
              />
              {formState.errors.mark && (
                <p className="text-sm text-red-500">
                  {formState.errors.mark.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-semibold text-white bg-green-600 hover:bg-green-700">
              Submit Mark
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
